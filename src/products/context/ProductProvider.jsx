import { useContext, useReducer } from "react"
import { ProductReducer } from "../reducer"
import { AuthContext } from "../../context/auth"
import { collection, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore/lite"
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
      const userDoc = doc(collection(FirebaseDB, "products"));
      await setDoc(userDoc, product);

      const action = { type: productTypes.saveProduct, payload: product };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByID = async () => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, "products"));
      const products = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if(productData.createdBy === user.uid){
          products.push({ id: doc.id, ...doc.data() });
        }
      });

      const action = { type: productTypes.getProductByID, payload: products };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, "products"));
      const products = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        products.push({ id: doc.id, ...productData });
      });

      const action = { type: productTypes.getAllProducts, payload: products };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async ( updatedProduct ) => {
    try {
      const productRef = doc(FirebaseDB, "products", updatedProduct.id);
      await updateDoc(productRef, updatedProduct);

      const action = { type: productTypes.updateProduct, payload: updatedProduct };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (product) => {
    try {
      const productRef = doc(FirebaseDB, "products", product.id);
      await deleteDoc(productRef);

      const action = { type: productTypes.deleteProduct, payload: product.id };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider value=
    {{
      ...productState,
      saveProduct,
      fetchProductsByID,
      updateProduct,
      deleteProduct,
      fetchAllProducts
    }}>
      {children}
    </ProductContext.Provider>
  )
}
