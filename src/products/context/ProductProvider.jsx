import { useContext, useReducer } from "react"
import { ProductReducer } from "../reducer"
import { AuthContext } from "../../context/auth"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/connectionFireBase"
import { productTypes } from "../types/types"
import { ProductContext } from './'

const initialState = {
  product: []
}

export const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(ProductReducer, initialState);

  const { user } = useContext(AuthContext);

  const saveProduct = async ( product ) => {

    try {
      const newDoc = doc(collection(FirebaseDB, `${user.uid}/niah_shop/products`));

      await setDoc(newDoc, product);

      product.id = newDoc.id;

      const action  = {type: productTypes.saveProduct, payload: product}

      dispatch(action);

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <ProductContext.Provider value=
    {{
      ...productState,
      saveProduct
    }}>
      {children}
    </ProductContext.Provider>
  )
}
