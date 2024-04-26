import React from 'react'
import { Link } from 'react-router-dom';
export const PushProuduct = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <form>
            <h2>Subir producto</h2>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Nombre del producto"
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    type="text"
                    required
                    className="form-control"
                    placeholder="Descripción del producto"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <div className="dropdown">
                    <button className="btn btn-outline-dark text-dark dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categoría
                    </button>
                    <ul className="dropdown-menu form-control">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </div>
                  <div className='mt-3'>
                    <button className="btn btn-outline-dark text-dark form-control">
                      <Link className="nav-link" to="/">subir imagen</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div>
              <button className="btn btn-outline-dark text-dark">
                <Link className="nav-link" to="/">Publicar</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      
  )
}
