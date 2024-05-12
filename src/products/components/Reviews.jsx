import { useContext, useEffect } from "react"
import { reviewContext } from "../../reviews/context"

export const Reviews = ( productId ) => {

    const {review, getReviews} = useContext(reviewContext)
    useEffect(() => {
      getReviews(productId);
    }, [])

  return (
    <>
        {
            review.map(review=>(
                <div key={review.id} className="container mt-5">
                    <div className="justify-content-center align-items-center">
                        <div className="card p-4">
                            <h5>{review.title}</h5>
                            <p>{review.description}</p>
                            <h6>calificacion: {review.calification}</h6>

                        </div>
                    </div>
                </div>
            ))
        }
    </>
  )
}
