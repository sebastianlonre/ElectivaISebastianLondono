import React, { useContext, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Login, Register } from '../modals';
import { AuthContext } from '../context/auth/AuthContext';
import { useModal } from '../modals/hooks/useModal';


export const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const loginModal = useModal();
  const registerModal = useModal();
  const location = useLocation();
  const dropdownRef = useRef(null);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
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
                <li className="nav-item dropdown" ref={dropdownRef}>
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
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
            <ul className="navbar-nav ms-2"> 
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
