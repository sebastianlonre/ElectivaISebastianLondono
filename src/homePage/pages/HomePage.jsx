import React, { useState, useEffect } from "react";
import { ProductContext } from '../../products/context';
import { ProductGrid } from '../components';
import { useContext } from "react";
import { SocialContext } from "../../social/context";

export const HomePage = () => {
  const { product, fetchAllProducts } = useContext(ProductContext);
  const { MyFollowing, getMyFollowing } = useContext(SocialContext);
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    category: false,
    createdBy: false
  });

  useEffect(() => {
    fetchAllProducts();
    getMyFollowing();
  }, []);

  const filterProducts = (products, filterValue) => {
    return products.filter(item => {
      if (selectedOptions.category && item.selectedCategory) {
        return item.selectedCategory.toLowerCase().includes(filterValue.toLowerCase());
      } else if (selectedOptions.createdBy && item.displayName) {
        return item.displayName.toLowerCase().includes(filterValue.toLowerCase());
      } else {
        return item.productName.toLowerCase().includes(filterValue.toLowerCase());
      }
    });
  };

  useEffect(() => {
    const filtered = filterProducts(product, inputValue);
    setFilteredProducts(filtered);
  }, [inputValue, product, selectedOptions.category, selectedOptions.createdBy]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option]
    }));
  };

  const filteredProductsSocial = filteredProducts.filter(item => {
    return MyFollowing.some(following => following.followedUserID === item.createdBy);
  });

  const otherFilteredProducts = filteredProducts.filter(item => {
    return !MyFollowing.some(following => following.followedUserID === item.createdBy);
  });

  const combinedResults = [...filteredProductsSocial, ...otherFilteredProducts];

  return (
    <div>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12 mb-4">
            <form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Buscar"
                  className="form-control"
                />
                <button className="btn btn-outline-secondary" type="button" onClick={toggleAdvancedOptions}>
                  Opciones avanzadas
                </button>
              </div>
              {showAdvancedOptions && (
                <div className="row mt-2">
                  <div className="col-md-7 d-flex align-items-center justify-content-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="category"
                        checked={selectedOptions.category}
                        onChange={() => handleOptionChange('category')}
                      />
                      <label className="form-check-label" htmlFor="category">Categoría</label>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="createdBy"
                        checked={selectedOptions.createdBy}
                        onChange={() => handleOptionChange('createdBy')}
                      />
                      <label className="form-check-label" htmlFor="createdBy">Creado por</label>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="row">
          {inputValue ? (
            combinedResults.length > 0 ? (
              <ProductGrid product={combinedResults} tittle={"Resultados de la búsqueda"} productPer={6} />
            ) : (
              <div className="col-md-12">
                <p>No se encontraron productos que coincidan con la búsqueda.</p>
              </div>
            )
          ) : (
            <div>
              {filteredProductsSocial.length > 0 && (
                <ProductGrid product={filteredProductsSocial} tittle={"Productos de usuarios a los que sigues"} productPer={2} />
              )}
              <ProductGrid product={product} tittle={"Productos"} productPer={4} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
