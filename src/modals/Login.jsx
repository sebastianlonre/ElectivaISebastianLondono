import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const Login = ({ isOpen, onClose, openRegisterForm }) => {
  const { login, errorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form onSubmit={handleLogin}>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2>Iniciar sesión</h2>
              <br />
              <div className="input-group mb-3">
                <input
                  type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Correo'
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Contraseña'
                />
              </div>

              {error && <p className="text-danger">{error}</p>}

              <Link className="nav-link" onClick={() => { onClose(); openRegisterForm(); }}>¿No tienes una cuenta? Regístrate</Link>
              <br />

              <div>
                <button className="btn btn-outline-dark text-dark" type="submit">Iniciar sesión</button>
              </div>
              { !errorMessage ? null :
                    <div
                      className="alert alert-danger"
                      role="alert"
                    >
                      { errorMessage }
                    </div>
                  }
            </form>
          </div>
        </div>
      )}
    </>
  );
};
