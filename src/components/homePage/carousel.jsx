export const Carousel = () => {
  return (
    <>
        <div className="col-md-10 offset-md-1">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://www.elpais.com.co/resizer/FFFKwPILxHx0pPT3CXsAG_z3Hy8=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/2CCVEYGU45DZVBXM5R5BI7SX54.png" className="d-block w-100" alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img src="https://cdn.urbantecno.com/urbantecno/2022/09/asus-vivobook-14.jpeg" className="d-block w-100" alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img src="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/ncom/en_US/switch/videos/heg001-07060600/posters/oled-model" className="d-block w-100" alt="Third slide" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>

            </div> 
        </div>          
    </>
  )
}


