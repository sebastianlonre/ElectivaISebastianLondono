import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from '../reducers/AuthReducer';
import { types } from '../types';
import { signInUser, logoutUser } from '../../firebase/firebaseProvider';


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

  const login = async (email='', password='') => {
    const { ok, uid, photoURL, displayName, errorMessage } = await signInUser(email, password);

    if (!ok) {
      dispatch({ type: types.login, payload: { errorMessage }})
    }

    const payload = {uid, email, photoURL, displayName, email}

    const action = { type: types.login, payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  };

  const logout = async () => {
    localStorage.removeItem('user');
    const action ={type: types.logout}
    logoutUser();
    dispatch(action)
  };

  const updateUser = (updatedUserData) => {
    dispatch({ type: types.update, payload: updatedUserData });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};