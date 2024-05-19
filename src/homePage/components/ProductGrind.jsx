import { ProductCard } from "./ProductCard";
import { ProductContext } from '../../products/context'
import { useContext, useEffect, useState } from "react";

export const ProductGrid = ({ product , tittle}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [product]);

  return (
    <div className="container">
      <h3 className="mt-3">{tittle}</h3>
      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-6 mb-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(product.length / productsPerPage) }).map((_, index) => (
          <li key={index} className="page-item">
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
