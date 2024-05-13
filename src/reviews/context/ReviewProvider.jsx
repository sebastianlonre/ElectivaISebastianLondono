import { useReducer } from "react"
import { reviewReducer } from "../reducer"
import { reviewContext } from "."
import { FirebaseDB } from "../../firebase/connectionFireBase"
import { doc, collection, setDoc, getDocs, getAggregate, average } from "firebase/firestore/lite"
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

  const averageReviews = async (productID) => {
    try {
      const coll = collection(FirebaseDB, `products/${productID}/reviews`);
      const snapShot = await getDocs(coll);
      let totalCalification = 0;
      let reviewCount = 0;

      snapShot.forEach(doc => {
        const data = doc.data();
        if (data.calification) {
          const calificationValue = parseFloat(data.calification);
          totalCalification += calificationValue;
          reviewCount++;
        }
      });

      const averageCalification = reviewCount > 0 ? totalCalification / reviewCount : 0;


      return averageCalification;

    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  return(
    <reviewContext.Provider value={{
      ...reviewState,
      saveReview,
      getReviews,
      averageReviews
    }}>
      {children}
    </reviewContext.Provider>
  )

}