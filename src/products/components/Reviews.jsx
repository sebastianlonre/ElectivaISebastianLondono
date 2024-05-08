
export const Reviews = () => {

    const reviews = [
        {id: 1,user:"gatita89",productID:"567", title: "pesimo",description:"llega en mal estado",calificacion:"1"},
        {id: 2,user:"gatita88",productID:"567", title: "me encanto",description:"gran producto",calificacion:"5"},
        {id: 3,user:"gatita87",productID:"567", title: "Como me salgo de aqui",description:"saugnjasg",calificacion:"2"},
        {id: 4,user:"gatita86",productID:"567", title: "calidad precio",description:"Es excelente por su precio",calificacion:"3"},
        {id: 5,user:"gatita85",productID:"567", title: "No se que poner",description:"a",calificacion:"5"}
    ]
  return (
    <>
        {
            reviews.map(review=>(
                <div key={review.id} className="container mt-5">
                    <div className="justify-content-center align-items-center">
                        <div className="card p-4">
                            <h5>{review.title}</h5>
                            <p>{review.user}</p>
                            <p>{review.description}</p>
                            <h6>calificacion: {review.calificacion}</h6>

                        </div>
                    </div>
                </div>
            ))
        }
    </>
  )
}
