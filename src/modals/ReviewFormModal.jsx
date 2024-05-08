import React from 'react'

export const ReviewFormModal = ({isOpen, onClose}) => {
  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
            
        <div className="card p-4">
          <form>
          <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
            <h2>Reseña</h2>
            <br></br>
            <div className="input-group mb-3">
              <input 
                type="text" 
                required
                className="form-control" 
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default" 
                placeholder='Titulo'/>
            </div>

            <div className="input-group mb-3">
              <textarea 
                type="text" 
                className="form-control" 
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default" 
                placeholder='Descripcion'/>
            </div>
            <div className="col-md-6">
                <div>
                    <div className="dropdown">
                        <button id="calificationBtn" className="btn btn-outline-dark text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Calificacion
                        </button>
                        <ul className="dropdown-menu form-control">
                            <li><a className="dropdown-item" data-value="1">1</a></li>
                            <li><a className="dropdown-item" data-value="2">2</a></li>
                            <li><a className="dropdown-item" data-value="3">3</a></li>
                            <li><a className="dropdown-item" data-value="4">4</a></li>
                            <li><a className="dropdown-item" data-value="5">5</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <br></br>

            <div>
              <button className="btn btn-outline-dark text-dark" type="submit">Publicar</button>
            </div>
          </form>
        </div>
      </div>
      )}
    </>
  )
}

