import { productTypes } from "../types/types";

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productTypes.saveProduct:
      return {
        ...state,
        product: state.product.push(action.payload)
      };
    case productTypes.getProductByID:
      return {
        ...state,
        product: action.payload
      };
      case productTypes.updateProduct:
        return {
          ...state,
          product: state.product.map(item =>
            item.id === action.payload.id ? action.payload : item
          )
        };
      case productTypes.deleteProduct:
        return{
          product: null
        }
      case productTypes.getAllProducts:
        return{
          ...state,
          product: action.payload
        }
      case productTypes.prevProduct:
        return{
          ...state,
          prevProduct: action.payload
        }
    default:
      return state;
  }
};