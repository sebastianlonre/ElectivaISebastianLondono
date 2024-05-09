import React, { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Login, Register } from '../modals';
import { AuthContext } from '../context/auth/AuthContext';
import { useModal } from '../modals/hooks/useModal';


export const NavBar = () => {

    const { user, logout } = useContext(AuthContext);

    const loginModal = useModal();
    const registerModal = useModal();

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-5 border-gray">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="container-fluid mr-md-1">
                        <h3>
                            <Link className="nav-link" to="/">niah</Link>
                        </h3>
                    </div>
                    <ul className="navbar-nav">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">inicio</Link>
                        </li>
                        {user &&(
                            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                <Link className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false" to='/Profile'>
                                    perfil
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-light">

                                    <li>
                                        <Link className="dropdown-item" to="/Profile">{user?.email}</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/pushProuduct">subir producto</Link>
                                    </li>
                                </ul>
                                </li>
                            </ul>
                        </div>
                        )}

                        {!user && (
                            <>
                                <li className={`nav-item`}>
                                    <Link className="nav-link" onClick={loginModal.openModal}>Login</Link>
                                </li>
                                <li className={`nav-item`}>
                                    <Link className="nav-link" onClick={registerModal.openModal}>Register</Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/' onClick={logout}>Logout</Link>
                                </li>
                            </>
                        )}

                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder=". . ." aria-label="Search"/>
                        <button className="btn btn-outline-dark text-dark" type="submit">Buscar</button>
                    </form>
                </div>
                <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} openRegisterForm={registerModal.openModal}/>
                <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} openLoginForm={loginModal.openModal}/>
            </div>
        </nav>
        <Outlet/>
    </>
  )
}
