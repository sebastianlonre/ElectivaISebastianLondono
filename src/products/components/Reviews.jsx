import { useContext, useEffect } from "react"
import { reviewContext } from "../../reviews/context"
import { useNavigate } from "react-router-dom";

export const Reviews = ( productId ) => {


    const navigate = useNavigate();
    const {review, getReviews} = useContext(reviewContext);
    useEffect(() => {
      getReviews(productId);
    }, [])

    const goViewProfile = ( id ) => {
        navigate(`/ViewProfile/${id}`);
        location.reload();
      }

  return (
    <>
    {review.map(review=>(
      <div key={review.id} className="container mt-5">
        <div className="justify-content-center align-items-center">
          <div className="card p-4">
            <h5>{review.title}</h5>
            <div className="row">
              <div className="col-6">
                <button className="nav-link" type="button" onClick={() => goViewProfile(review.createdBy)}>
                  Subido por: {review.displayNameBy}
                </button>
              </div>
            </div>
            <p>{review.description}</p>
            <h6>calificacion: {review.calification}</h6>
          </div>
        </div>
      </div>
    ))}
  </>
  )
}
