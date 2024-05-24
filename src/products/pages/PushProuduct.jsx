import React, { useContext, useState } from 'react'
import { ProductContext } from '../context/'
import { AuthContext } from '../../context/auth';
import { uploadImg } from '../../firebase/firebaseProvider';
import { useNavigate } from 'react-router-dom';

export const PushProuduct = () => {

  const { saveProduct } = useContext( ProductContext );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');


  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.getAttribute('data-value'));
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const NewProduct = async (event) => {
    event.preventDefault();

    const folder = "productsPhoto";
    const imgURL = await uploadImg(file, folder);

    const newProduct = {
      createdBy: user.uid,
      displayName:user.displayName,
      productName,
      productDescription,
      selectedCategory,
      price,
      imgURL: `${imgURL}`,
      createdAt: formatDate(new Date().toISOString()),
      updatedAt: formatDate(new Date().toISOString()),
    }
    await saveProduct(newProduct)
    navigate("/HomePage")
    location. reload()
  };

   return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow-lg border-0 rounded-3">
          <form onSubmit={NewProduct}>
            <h2 className="mb-4 text-center">Subir Producto</h2>
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
                    rows="5"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {selectedCategory ? `${selectedCategory}` : 'Categoría'}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li><a className="dropdown-item" data-value="Computadores" onClick={handleCategoryChange}>Computadores</a></li>
                      <li><a className="dropdown-item" data-value="Celulares android" onClick={handleCategoryChange}>Celulares android</a></li>
                      <li><a className="dropdown-item" data-value="Camaras" onClick={handleCategoryChange}>Camaras</a></li>
                      <li><a className="dropdown-item" data-value="Accesorios" onClick={handleCategoryChange}>Accesorios</a></li>
                      <li><a className="dropdown-item" data-value="Celulares Iphone" onClick={handleCategoryChange}>Celulares Iphone</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="Precio"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="mb-3">
                  <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};