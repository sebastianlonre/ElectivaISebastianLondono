import { socialTypes } from '../types';

export const socialReducer = (state = {}, action) => {
  switch (action.type) {
    case socialTypes.followUser:
      return {
        ...state,
        following: [...state.following, action.payload]
      };
    case socialTypes.getUserByID:
      return {
        ...state,
        social: action.payload
      };
    case socialTypes.getFollowers:
      return {
        ...state,
        followers: action.payload
      };
    case socialTypes.getFollowings:
      return {
        ...state,
        following: action.payload
      };
      case socialTypes.getMyFollowings:
        return {
          ...state,
          MyFollowing: action.payload
        };
    case socialTypes.unFollow:
      return {
        ...state,
        following: state.following.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};
