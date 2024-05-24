import React, { useContext } from 'react';
import { useForm } from './hooks/useForm';
import { reviewContext } from '../reviews/context';
import { AuthContext } from '../context/auth';


export const ReviewFormModal = ({ isOpen, onClose, productId }) => {
  const { saveReview } = useContext(reviewContext);
  const { user } = useContext(AuthContext);

  const initForm = {
    title: "",
    description: "",
    calification: ""
  };

  const { title, description, calification, onInputChange } = useForm(initForm);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const newReview = async (event) => {
    event.preventDefault();
    const review = {
      createdBy: user.uid,
      displayNameBy: user?.displayName,
      title,
      description,
      calification,
      createdAt: formatDate(new Date().toISOString()),
    }
    await saveReview(review, productId)
    location.reload()
  }

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card w-50 p-4 rounded shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
            <form onSubmit={newReview}>
              <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2 className="text-center mb-4">Escribe tu reseña</h2>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  required
                  className="form-control"
                  placeholder="Título de la reseña"
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={onInputChange}
                  placeholder="Descripción"
                />
              </div>
              <div className="mb-3">
                <div className="dropdown">
                  <button id="calificationBtn" className="btn btn-outline-dark text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {calification || 'Calificación'}
                  </button>
                  <ul className="dropdown-menu">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <li key={rating}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => onInputChange({ target: { name: 'calification', value: `${rating}` } })}
                        >
                          {rating}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};