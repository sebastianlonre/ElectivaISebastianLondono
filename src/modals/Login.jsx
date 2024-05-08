import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { FirebaseAuth } from '../firebase/connectionFireBase'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 

export const Login = ({ isOpen, onClose, openRegisterForm }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isOpen]); 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(FirebaseAuth, username, password);
      const user = userCredential.user;
      if (user) {
        login(user); 
        onClose();
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error al iniciar sesión:', error);
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


