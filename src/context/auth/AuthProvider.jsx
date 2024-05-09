import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from '../reducers/AuthReducer';
import { types } from '../types';
import { FirebaseAuth } from '../../firebase/connectionFireBase';


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

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: types.login, payload: user });
      } else {
        localStorage.removeItem('user');
        dispatch({ type: types.logout });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (userData) => {
    const { email, password } = userData;
    await FirebaseAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    localStorage.removeItem('user');
    const action ={type: types.logout}
    await FirebaseAuth.signOut();
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