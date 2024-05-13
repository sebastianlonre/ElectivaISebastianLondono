import { reviewTypes } from "../types";

export const reviewReducer = (state={}, action) => {
switch (action.type) {
  case reviewTypes.saveReview:
    return{
      ...state,
      review: state.review.push(action.payload)
    }
  case reviewTypes.getReviews:
    return{
      ...state,
      review: action.payload
    }
  default:
    return state;
}
}