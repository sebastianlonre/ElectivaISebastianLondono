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

  const newReview = async (event)=>{
    event.preventDefault();
    const review={
      createdBy: user.uid,
      title,
      description,
      calification,
      createdAt: formatDate(new Date().toISOString()),
    }
    await saveReview(review, productId)
    location. reload()
  }

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">

          <div className="card p-4">
            <form onSubmit={newReview}>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2>Reseña</h2>
              <br></br>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Titulo'/>
              </div>

              <div className="input-group mb-3">
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={description}
                  onChange={onInputChange}
                  placeholder='Descripcion'/>
              </div>
              <div className="col-md-6">
                <div>
                  <div className="dropdown">
                    <button id="calificationBtn" className="btn btn-outline-dark text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {calification || 'Calificacion'}
                    </button>
                    <ul className="dropdown-menu form-control">
                      <li><button type="button" className="dropdown-item" onClick={() => onInputChange({ target: { name: 'calification', value: '1' } })}>1</button></li>
                      <li><button type="button" className="dropdown-item" onClick={() => onInputChange({ target: { name: 'calification', value: '2' } })}>2</button></li>
                      <li><button type="button" className="dropdown-item" onClick={() => onInputChange({ target: { name: 'calification', value: '3' } })}>3</button></li>
                      <li><button type="button" className="dropdown-item" onClick={() => onInputChange({ target: { name: 'calification', value: '4' } })}>4</button></li>
                      <li><button type="button" className="dropdown-item" onClick={() => onInputChange({ target: { name: 'calification', value: '5' } })}>5</button></li>
                    </ul>
                  </div>
                </div>
              </div>

              <br></br>

              <div>
                <button className="btn btn-outline-dark text-dark" type="submit">Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
