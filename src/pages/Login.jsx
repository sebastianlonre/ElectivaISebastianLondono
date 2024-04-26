import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const Login = ({ isOpen, onClose, openRegisterForm }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {

    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      login(foundUser);
      onClose();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
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
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Usuario'
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};
