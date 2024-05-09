import { productTypes } from "../types/types";

export const ProductReducer = (state={}, action)=>{
  switch (action.type) {
    case productTypes.saveProduct:
      return{
        ...state,
        product: state.product.push(action.payload)
      }

    default:
      return state;
  }
}