import { useContext, useReducer } from "react";
import { socialReducer } from "../reducer";
import { SocialContext } from ".";
import { AuthContext } from "../../context/auth";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/connectionFireBase";
import { socialTypes } from "../types";

const initialState = {
  social: {},
  followers: [],
  following: [],
  MyFollowing: []
};

export const SocialProvider = ({ children }) => {
  const [socialState, dispatch] = useReducer(socialReducer, initialState);

  const { user } = useContext(AuthContext);

  const followUser = async (userID, socialName, MyName) => {
    try {
      const userDocAuth = doc(collection(FirebaseDB, `/users/${user.uid}/following`), userID);
      const userDoc = doc(collection(FirebaseDB, `/users/${userID}/followers`), user.uid);
      await setDoc(userDocAuth, { followedUserID: userID, displayName: socialName});
      await setDoc(userDoc, { followerUserID: user.uid, displayName: MyName});

      const action = { type: socialTypes.followUser, payload: userID };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async (userID) => {
    try {
      const userDocAuth = doc(collection(FirebaseDB, `/users/${user.uid}/following`), userID);
      const userDoc = doc(collection(FirebaseDB, `/users/${userID}/followers`), user.uid);
      await deleteDoc(userDocAuth);
      await deleteDoc(userDoc);

      const action = { type: socialTypes.unFollow, payload: userID };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByID = async (userID) => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, "/users"));
      let user = {};

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.uid === userID) {
          user = { id: doc.id, ...userData };
        }
      });

      const action = { type: socialTypes.getUserByID, payload: user };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async (userID) => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, `users/${userID}/followers`));
      const followers = [];

      querySnapshot.forEach((doc) => {
        const followersData = doc.data();
        followers.push({ id: doc.id, ...followersData });
      });

      const action = { type: socialTypes.getFollowers, payload: followers };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async (userID) => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, `users/${userID}/following`));
      const following = [];

      querySnapshot.forEach((doc) => {
        const followingData = doc.data();
        following.push({ id: doc.id, ...followingData });
      });

      const action = { type: socialTypes.getFollowings, payload: following };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyFollowing = async (userID) => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, `users/${userID}/following`));
      const following = [];

      querySnapshot.forEach((doc) => {
        const followingData = doc.data();
        following.push({ id: doc.id, ...followingData });
      });

      const action = { type: socialTypes.getMyFollowings, payload: following };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SocialContext.Provider value={{
      social: socialState.social,
      followers: socialState.followers,
      following: socialState.following,
      MyFollowing: socialState.MyFollowing,
      followUser,
      unFollowUser,
      getUserByID,
      getFollowers,
      getFollowing,
      getMyFollowing
    }}>
      {children}
    </SocialContext.Provider>
  );
};
