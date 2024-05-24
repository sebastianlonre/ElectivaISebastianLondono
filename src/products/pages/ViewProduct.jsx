import { useNavigate, useLocation } from 'react-router-dom';
import { Reviews } from '../components';
import { ReviewFormModal, Register, Login } from '../../modals';
import { useModal } from '../../modals/hooks/useModal';
import { AuthContext } from '../../context/auth/AuthContext';
import { useContext } from 'react';
import { reviewRate } from "../../reviews/components/reviewRate";

export const ViewProduct = () => {
  const location = useLocation();
  const { state: { product } } = location;
  const { user } = useContext(AuthContext);
  const avgRating = reviewRate(product.id);

  const reviewModal = useModal();
  const loginModal = useModal();
  const registerModal = useModal();
  const navigate = useNavigate();

  const shopProduct = () => {
    if (user) {
      console.log("comprado");
      navigate("/");
    } else {
      loginModal.openModal();
    }
  };

  const goViewProfile = (id) => {
    navigate(`/ViewProfile/${id}`);
    location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="card p-4 col-md-8 shadow-lg border-0 rounded-3">
          <div className="row">
            <div className="col-md-6">
              <img src={product.imgURL} className="img-fluid rounded-3" alt={product.productName} />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h2 className="mb-3">{product.productName}</h2>
              <h5 className="text-muted mb-3">ID: {product.id}</h5>
              <h5 className="text-warning mb-3">{avgRating}⭐</h5>
              <p className="mb-3">{product.productDescription}</p>
              <p className="mb-3"><span className="badge bg-info">{product.selectedCategory}</span></p>
              <h5 className=" mb-3">${product.price}</h5>
              <div className="d-flex">
                <button type="button" className="btn btn-secondary me-2" onClick={shopProduct}>
                  <strong>Comprar</strong>
                </button>
                {user && user.uid !== product.createdBy && (
                  <button type="button" className="btn btn-light" onClick={reviewModal.openModal}>
                    <strong>Subir reseña</strong>
                  </button>
                )}
              </div>
              <br />
              <div className="border p-3">
                <nav>
                  <span className="text-dark d-block mb-2" style={{fontWeight: 'bold'}}>Subido por:</span>
                  <button className="btn btn-link p-0" type="button" onClick={() => goViewProfile(product.createdBy)}>
                    <span style={{ textDecoration: 'none' }}><strong>{product.displayName}</strong></span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Reviews reviewId={product.id} />
      </div>
      <ReviewFormModal isOpen={reviewModal.isOpen} onClose={reviewModal.closeModal} productId={product.id} />
      <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} openLoginForm={loginModal.openModal} />
      <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} openRegisterForm={registerModal.openModal} />
    </div>
  );
};
