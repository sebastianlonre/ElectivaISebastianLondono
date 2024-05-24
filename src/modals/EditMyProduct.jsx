import { useState, useContext } from 'react';
import { ProductContext } from '../products/context';

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
    location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Producto</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Descripción del Producto</label>
                    <textarea
                      className="form-control"
                      id="productDescription"
                      rows="3"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="selectedCategory" className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      id="selectedCategory"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="Computadores">Computadores</option>
                      <option value="Celulares android">Celulares android</option>
                      <option value="Camaras">Cámaras</option>
                      <option value="Accesorios">Accesorios</option>
                      <option value="Celulares Iphone">Celulares iPhone</option>
                    </select>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
