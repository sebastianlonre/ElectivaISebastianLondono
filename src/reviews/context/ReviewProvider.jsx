import { useReducer } from "react"
import { reviewReducer } from "../reducer"
import { reviewContext } from "."
import { FirebaseDB } from "../../firebase/connectionFireBase"
import { doc, collection, setDoc } from "firebase/firestore/lite"
import { reviewTypes } from "../types"

const initialState = {
  review: []
}

export const ReviewProvider = ({children}) => {

  const [reviewState, dispatch] = useReducer(reviewReducer, initialState)

  const saveReview = async ( review, productID ) =>{
    try {
      const reviewDoc = doc(collection(FirebaseDB, `products/${productID}/reviews`));
      await setDoc(reviewDoc, review);

      const action = {type: reviewTypes.saveReview, payload: review};
      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <reviewContext.Provider value={{
      ...reviewState,
      saveReview
    }}>
      {children}
    </reviewContext.Provider>
  )

}