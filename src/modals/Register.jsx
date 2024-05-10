import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from './hooks/useForm';
import { AuthContext } from '../context/auth/AuthContext';

const initForm = {
  email: '',
  password: '',
  displayName: '',
  bio: ''
};

export const Register = ({ isOpen, onClose, openLoginForm }) => {
  const { register, errorMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password, displayName, bio, onInputChange } = useForm(initForm);

  const onRegister = async (event) => {
    event.preventDefault();
    const isValidRegister = await register(email, password, displayName, bio);
    if (isValidRegister) {
      const lastPath = localStorage.getItem('lastPath') || '/';
      navigate(lastPath, { replace: true });
      onClose(); 
    }
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2>Regístrate</h2>
              <br />
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  placeholder="Usuario"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="Correo"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Contraseña"
                />
              </div>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="3"
                  value={bio}
                  onChange={onInputChange}
                  placeholder="Bio"
                ></textarea>
              </div>
              <button type="submit" onClick={onRegister}>
                Registrarse
              </button>
              <br />
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <br />
            </form>
            <Link className="nav-link" onClick={() => { onClose(); openLoginForm(); }}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
