import { useContext, useReducer } from "react"
import { socialReducer } from "../reducer"
import { SocialContext } from "."
import { AuthContext } from "../../context/auth"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/connectionFireBase"
import { socialTypes } from "../types"

const initialState = {
  social: []
}

export const SocialProvider = ({ children }) => {
  const [socialState, dispatch] = useReducer(socialReducer, initialState)

  const { user } = useContext(AuthContext);

  const followUser = async ( userID ) =>{
    try {
      const userDocAuth = doc(collection(FirebaseDB, `/users/${user.uid}/following`));
      const userDoc = doc(collection(FirebaseDB, `/users/${userID}/followers`));
      await setDoc(userDocAuth, { followedUserID: userID });
      await setDoc(userDoc, { followerUserID: user.uid });

      const action = {type: socialTypes.followUser, payload: userID}
      dispatch(action);
      console.log("usuario seguido")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SocialContext.Provider value={{
      ...socialState,
      followUser
    }}>
      {children}
    </SocialContext.Provider>
  )
}
