import {  useNavigate, useParams } from 'react-router-dom';
import { Reviews } from '../components';
import { ReviewFormModal, Register, Login } from '../../modals';
import { useModal } from '../../modals/hooks/useModal';
import { AuthContext } from '../../context/auth/AuthContext';
import { useContext } from 'react';
import { reviewRate } from "../../reviews/components/reviewRate";

export const ViewProduct = () => {

  const { user } =useContext(AuthContext);
  let { productId, productName, productDescription, productTicket, price } = useParams();
  const avgRating = reviewRate(productId);

  const reviewModal = useModal();
  const loginModal = useModal();
  const registerModal = useModal();
  const navigate = useNavigate();

  const shopProduct = () => {
    if(user){
      console.log("comprado");
      navigate("/");
    }else{
      loginModal.openModal();
    }
  }

  return (
    <div className="container mt-5">
      <div className="justify-content-center align-items-center">
        <div className="card p-4">
          <form>
            <br />
            <div className="row">
              <div className="col-md-6">
                <img
                src="https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha"
                className=" img-fluid"
                />
              </div>
              <div className="col-md-6">
                <div className='description-div'>
                <h2>{productName}</h2>
                <h5 className="text-secondary">id: {productId}</h5>
                <h5 className="mt-2 rate-margin">{avgRating}⭐</h5>
                  <p>Subido por: {user?.email}</p>
                  <p className='mt-4'>{productDescription}</p>
                </div>
                <div className='d-flex'>
                  <p className="mt-3">etiqueta: { productTicket }</p>
                </div>

                <div className='d-flex flex-row'>
                  <button type='button' className="btn btn-outline-dark text-dark mt-3 mr-2" onClick={shopProduct}>
                    comprar
                  </button>
                  {user &&(
                    <>
                      <button type='button' className="btn btn-outline-dark text-dark mt-3" onClick={reviewModal.openModal}>
                      Subir reseña
                      </button>
                    </>
                  )}
                   <h5 className="mt-4 price-margin">${price}</h5>
                </div>

              </div>
            </div>

            <br />
            <div>

            </div>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <Reviews reviewId={productId}/>
      </div>
      <ReviewFormModal isOpen={reviewModal.isOpen} onClose={reviewModal.closeModal} productId={productId} />
      <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} openLoginForm={loginModal.openModal}/>
      <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} openRegisterForm={registerModal.openModal}/>
    </div>
  )
}
