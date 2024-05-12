import { reviewContext } from "../../reviews/context";
import { useContext, useEffect, useState } from "react";

export const reviewRate = ( productID ) => {

  const { averageReviews } = useContext(reviewContext)

    const [avgRating, setAvgRating] = useState(0);

    useEffect(() => {
      const fetchAverageRating = async () => {
          const rating = await averageReviews(productID);
          setAvgRating(rating);
      };

      fetchAverageRating();
    }, []);

  return (avgRating)
}
