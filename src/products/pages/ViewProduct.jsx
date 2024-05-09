import { Link } from 'react-router-dom';
import { Reviews } from '../components';
import { ReviewFormModal, Register, Login } from '../../modals';
import { useModal } from '../../modals/hooks/useModal';
import { AuthContext } from '../../context/auth/AuthContext';
import { useContext } from 'react';

export const ViewProduct = () => {

  const { user } =useContext(AuthContext);

  const reviewModal = useModal();
  const loginModal = useModal();
  const registerModal = useModal();

  const shopProduct = () => {
    if(user){
      reviewModal.openModal();
    }else{
      loginModal.openModal();
    }
  }

  return (
    <div className="container mt-5">
      <div className="justify-content-center align-items-center">
        <div className="card p-4">
          <form>
            <h2>Nombre del producto</h2>
            <br />
            <div className="row">
              <div className="col-md-6">
                <img
                src="https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha"
                className=" img-fluid"
                />
              </div>
              <div className="col-md-6">
                <div>
                  <h3>Link del producto</h3>
                  <p>usuario</p>
                  <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, voluptate aperiam voluptas voluptatum numquam optio, voluptatem accusamus soluta reiciendis, obcaecati fugiat illum quasi porro. Et consequuntur sequi illo aut minus.</p>
                </div>

                <p className="mt-3">etiquetas: tecnologia, camaras,</p>
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
        <Reviews/>
      </div>
      <ReviewFormModal isOpen={reviewModal.isOpen} onClose={reviewModal.closeModal} />
      <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} openLoginForm={loginModal.openModal}/>
      <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} openRegisterForm={registerModal.openModal}/>
    </div>
  )
}
