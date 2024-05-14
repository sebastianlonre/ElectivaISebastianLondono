import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Login, Register } from '../modals';
import { AuthContext } from '../context/auth/AuthContext';
import { useModal } from '../modals/hooks/useModal';

export const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const loginModal = useModal();
  const registerModal = useModal();
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-5 border-gray">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h3>Niah</h3>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              {user && (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/Profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/Profile">{user?.email || user?.googleEmail || ''}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Profile/pushProduct">Subir producto</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Profile/MyProducts">Mis Productos</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/" onClick={logout}>Logout</Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={loginModal.openModal}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={registerModal.openModal}>Register</Link>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder=". . ." aria-label="Search" />
              <button className="btn btn-outline-dark text-dark" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
     
      <div className="container mt-4">
        
        <Outlet />
      </div>
      
      <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} openRegisterForm={registerModal.openModal} />
      <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} openLoginForm={loginModal.openModal} />
    </>
  );
};

