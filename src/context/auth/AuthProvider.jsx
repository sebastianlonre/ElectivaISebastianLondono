import React, {  useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from '../reducers/AuthReducer';
import { types } from '../types';
import { signInUser, logoutUser, signInwithGoogle, registerUser, updateUser, uploadImg  } from '../../firebase/firebaseProvider';
import { updateUserDisplayName } from '../../firebase/firebaseProvider';
import { updateProfile } from 'firebase/auth';
import { FirebaseAuth } from '../../firebase/connectionFireBase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const initialState = { logged: false, user: null };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user: user
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = async (email = '', password = '') => {
    const { ok, uid, photoURL, displayName, errorMessage } = await signInUser(email, password);

    if (!ok) {
      dispatch({ type: types.error, payload: { errorMessage } });
      return false;
    }

    const payload = { uid, email, photoURL, displayName };

    const action = { type: types.login, payload };

    localStorage.setItem('user', JSON.stringify(payload));

    dispatch(action);

    return true;
  };

  const loginGoogle = async () => {
    const { ok, uid, photoURL, displayName, email: googleEmail, errorMessage } = await signInwithGoogle();

    if (!ok) {
      dispatch({ type: types.error, payload: { errorMessage } });
      return false;
    }

    const payload = { uid, googleEmail, photoURL, displayName };

    const action = { type: types.login, payload };

    localStorage.setItem('user', JSON.stringify(payload));

    dispatch(action);

    return true;
  };

  const logout = async () => {
    localStorage.removeItem('user');
    const action = { type: types.logout };
    logoutUser();
    dispatch(action);
  };

  const register = async (email, password, displayName) => {
    const { ok, errorMessage, photoURL, uid, bio } = await registerUser({ email, displayName, password });

    if (!ok) {
      if (errorMessage.includes('auth/email-already-in-use')) {
        dispatch({ type: types.error, payload: { errorMessage: 'Este correo electrónico ya está en uso.' } });
      } else {
        dispatch({ type: types.error, payload: { errorMessage } });
      }
      return false;
    }

    const currentDate = new Date().toISOString();

    const payload = { uid, email, photoURL, displayName, createdAt: currentDate, bio };
    const action = { type: types.login, payload };

    localStorage.setItem('user', JSON.stringify(payload));

    dispatch(action);

    return true;
  };

  const updateUserProfile = async (updatedUserData) => {
    const { displayName, ...otherData } = updatedUserData;

    if (displayName) {
      const displayNameUpdateResult = await updateUserDisplayName(displayName);
      if (!displayNameUpdateResult.ok) {
        return { ok: false, errorMessage: displayNameUpdateResult.errorMessage };
      }
    }


    otherData.updatedAt = new Date().toISOString();

    const { ok, message, errorMessage } = await updateUser(authState.user.uid, otherData);

    if (ok) {
      const updatedUser = { ...authState.user, ...updatedUserData, updatedAt: otherData.updatedAt };
      dispatch({ type: types.update, payload: updatedUser });
    }

    return { ok, message, errorMessage };
  };

  const updateUserProfileImageInContext = async (imageFile) => {
    if (!authState.user) return { ok: false, errorMessage: 'No user is logged in' };

    const imageUrl = await uploadImg(imageFile, 'userPhoto');

    if (imageUrl) {

      await updateProfile(FirebaseAuth.currentUser, { photoURL: imageUrl });


      const db = getFirestore();
      const userRef = doc(db, 'users', authState.user.uid);
      await updateDoc(userRef, { photoURL: imageUrl });

      const updatedUser = { ...authState.user, photoURL: imageUrl };
      dispatch({ type: types.update, payload: updatedUser });

      return { ok: true, imageUrl };
    } else {
      return { ok: false, errorMessage: 'Error uploading image' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        loginGoogle,
        register,
        updateUserProfile,
        updateUserProfileImageInContext
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
