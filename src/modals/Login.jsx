import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export const Login = ({ isOpen, onClose, openRegisterForm }) => {
  const { login, loginGoogle, errorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValidLogin = await login(email, password);

    if (isValidLogin) {
      onClose();
    }
  };

  const onGoogleLogin = async (event) => {
    event.preventDefault();

    try {
      const isValidLogin = await loginGoogle();
  
      if (isValidLogin) {
        onClose();
      } else {
        console.log('Error al iniciar sesión con Google');
      }
    } catch (error) {
      console.error('Error inesperado al iniciar sesión con Google:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form onSubmit={handleLogin}>
              <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={onClose}></button>
              <h2 className="mb-4">Iniciar sesión</h2>

              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Correo"
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Contraseña"
                />
              </div>

              {!errorMessage ? null : (
                <div className="alert alert-danger" role="alert">
                  Usuario o contraseña inválidos
                </div>
              )}
                <p className="text-center mt-3 mb-0 ">¿No tienes una cuenta?, <Link to="#" className="text-decoration-none " onClick={() => { onClose(); openRegisterForm(); }}>
                Regístrate
              </Link> </p>
              

              <button className="btn btn-dark d-block w-100 mt-3" type="submit">
                Iniciar sesión
              </button>

              <button className="btn btn-primary d-block w-100 mt-3" onClick={onGoogleLogin}>
                <FontAwesomeIcon icon={faGoogle} className="me-2" />
                Iniciar sesión con Google
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};
