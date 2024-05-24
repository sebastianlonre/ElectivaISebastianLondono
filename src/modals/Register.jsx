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
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="card p-4 shadow-lg rounded" style={{ maxWidth: '400px' }}>
            <button type="button" className="btn-close float-end text-white" aria-label="Close" onClick={onClose}></button>
            <h2 className="text-center mb-4 ">Regístrate</h2>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  placeholder="Usuario"
                  style={{ borderRadius: '25px', padding: '15px', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="Correo"
                  style={{ borderRadius: '25px', padding: '15px', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Contraseña"
                  style={{ borderRadius: '25px', padding: '15px', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}
                />
              </div>
              <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={onRegister} style={{ borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Registrarse
              </button>
            </form>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
            <p className="text-center mt-3 mb-0 ">¿Ya tienes una cuenta?, <Link onClick={() => { onClose(); openLoginForm(); }} className="text-decoration-none ">Inicia sesión</Link></p>
          </div>
        </div>
      )}
    </>
  );
};