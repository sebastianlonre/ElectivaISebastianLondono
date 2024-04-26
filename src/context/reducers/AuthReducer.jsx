import { types } from "../types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      }
    case types.logout:
      return {
        ...state,
        logged: false,
        user: null
      }
    case types.update:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    default:
      return state;
  }
}
