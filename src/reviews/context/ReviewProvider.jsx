import { useReducer } from "react"
import { reviewReducer } from "../reducer"
import { reviewContext } from "."
import { FirebaseDB } from "../../firebase/connectionFireBase"
import { doc, collection, setDoc, getDocs } from "firebase/firestore/lite"
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

  const getReviews = async ( productID ) => {
    try {
      const reviewsCollection = collection(FirebaseDB, `products/${productID.reviewId}/reviews`);
      const querySnapshot = await getDocs(reviewsCollection);
      const reviews = [];

      querySnapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });

      const action = { type: reviewTypes.getReviews, payload: reviews };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <reviewContext.Provider value={{
      ...reviewState,
      saveReview,
      getReviews
    }}>
      {children}
    </reviewContext.Provider>
  )

}