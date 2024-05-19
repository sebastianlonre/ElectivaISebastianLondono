import { socialTypes } from '../types'

export const socialReducer = (state ={}, action) =>{
  switch (action.type) {
    case socialTypes.followUser:
      return{
        ...state,
        social: state.social.push(action.payload)
      }
    case socialTypes.getUserByID:
      return{
        ...state,
        social: action.payload
      }
    case socialTypes.getFollowers:
      return{
        ...state,
        social: action.payload
      }
    case socialTypes.getFollowings:
      return{
        ...state,
        social: action.payload
      }
    case socialTypes.getFollowers:
      return{
        ...state,
        social: action.payload
      }
    case socialTypes.unFollow:
      return{
        social: null
      }
    default:
      return state;
  }
}