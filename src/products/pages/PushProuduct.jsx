import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/'

export const PushProuduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { saveProduct } = useContext( ProductContext );

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.getAttribute('data-value'));
  };

  const NewProduct = async (event) => {
    event.preventDefault();
    const newProduct = {
      productName,
      productDescription,
      selectedCategory,
    }
    await saveProduct(newProduct)
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <form onSubmit={NewProduct}>
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
                    value={productName}
                    onChange={handleProductNameChange}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    required
                    className="form-control"
                    placeholder="Descripción del producto"
                    value={productDescription}
                    onChange={handleProductDescriptionChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <div className="dropdown">
                    <button className="btn btn-outline-dark text-dark dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {selectedCategory ? `${selectedCategory}` : 'Categoría'}
                    </button>
                    <ul className="dropdown-menu form-control">
                      <li><a className="dropdown-item" data-value="Computadores" onClick={handleCategoryChange}>Computadores</a></li>
                      <li><a className="dropdown-item" data-value="Celulares android" onClick={handleCategoryChange}>Celulares android</a></li>
                      <li><a className="dropdown-item" data-value="Camaras" onClick={handleCategoryChange}>Camaras</a></li>
                      <li><a className="dropdown-item" data-value="Accesorios" onClick={handleCategoryChange}>Accesorios</a></li>
                      <li><a className="dropdown-item" data-value="Celulares Iphone" onClick={handleCategoryChange}>Celulares Iphone</a></li>
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
              <button type="submit" className="btn btn-outline-dark text-dark">
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};