import { useReducer } from "react";

import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers/AuthReducer";
import { types } from "../types";

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return {
    logged: !!user,
    user
  }
}

export const AuthProvider = ({ children }) => {
  
  const [authState, dispatch ] = useReducer(authReducer, initialState, init);

  const login = (userData) => {
    const action = { type: types.login, payload: userData }

    localStorage.setItem('user', JSON.stringify(userData))

    dispatch(action);
  }

  const logout = () => {
    localStorage.removeItem('user')
    const action = { type: types.logout }
    dispatch(action)
  }

  const updateUser = (updatedUserData) => {
    const action = { type: types.update, payload: updatedUserData }

    localStorage.setItem('user', JSON.stringify(updatedUserData))

    dispatch(action);
  }

  return (
    <AuthContext.Provider value={
      {
        ...authState,
        login: login,
        logout: logout,
        updateUser: updateUser
      }
    }
    >
      { children }
    </AuthContext.Provider>
  )
}
