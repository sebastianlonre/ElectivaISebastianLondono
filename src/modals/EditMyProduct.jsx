import { useState, useContext } from 'react'
import { ProductContext } from '../products/context'

export const EditMyProduct = ({ isOpen, onClose, product }) => {
  const [productName, setProductName] = useState(product.productName);
  const [productDescription, setProductDescription] = useState(product.productDescription);
  const [selectedCategory, setSelectedCategory] = useState(product.selectedCategory);
  const { updateProduct } = useContext(ProductContext);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.getAttribute('data-value'));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct({
      ...product,
      productName,
      productDescription,
      selectedCategory,
      updatedAt: formatDate(new Date().toISOString()),
    });
    onClose();
    location. reload()
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <button type="button" className="btn btn-close float-end" aria-label="Close" onClick={onClose}></button>
              <h2>Editar producto</h2>
              <br></br>
              <div className="input-group mb-3">
                <input
                  type="text"
                  required
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div>
                  <div className="dropdown">
                    <button className="btn btn-outline-dark text-dark dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {selectedCategory}
                    </button>
                    <ul className="dropdown-menu form-control">
                      <li><a className="dropdown-item" data-value="Computadores" onClick={handleCategoryChange}>Computadores</a></li>
                      <li><a className="dropdown-item" data-value="Celulares android" onClick={handleCategoryChange}>Celulares android</a></li>
                      <li><a className="dropdown-item" data-value="Camaras" onClick={handleCategoryChange}>Camaras</a></li>
                      <li><a className="dropdown-item" data-value="Accesorios" onClick={handleCategoryChange}>Accesorios</a></li>
                      <li><a className="dropdown-item" data-value="Celulares Iphone" onClick={handleCategoryChange}>Celulares Iphone</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <br></br>
              <div>
                <button className="btn btn-outline-dark text-dark" type="submit">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};