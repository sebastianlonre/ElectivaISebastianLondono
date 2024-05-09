import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

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
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form onSubmit={handleLogin}>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2 className="mb-4">Iniciar sesión</h2>

              <div className="input-group mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Correo"
                />
              </div>

              <div className="input-group mb-3">
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

              <Link className="nav-link" onClick={() => { onClose(); openRegisterForm(); }}>
                ¿No tienes una cuenta? Regístrate
              </Link>

              <button className="btn btn-outline-dark text-dark mt-3" type="submit">
                Iniciar sesión
              </button>

              {}
              <button className="btn btn-outline-primary mt-3" onClick={onGoogleLogin}>
                Iniciar sesión con Google
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};