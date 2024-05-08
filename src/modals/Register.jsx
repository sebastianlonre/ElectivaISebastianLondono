import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSubmit, handleChange } from './components/register/formFunctions';

export const Register = ({ isOpen, onClose, openLoginForm }) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, onClose);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  const handleInputChange = (e) => {
    handleChange(e, formData, setFormData);
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form onSubmit={handleFormSubmit}>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2>Regístrate</h2>
              <br />
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Usuario"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Correo"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Contraseña"
                />
              </div>
              <Link className="nav-link" onClick={() => { onClose(); openLoginForm(); }}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
              <br />
              <div>
                <button className="btn btn-outline-dark text-dark" type="submit">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};