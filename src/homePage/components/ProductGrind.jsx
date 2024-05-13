import { ProductCard } from "./ProductCard";
import { ProductContext } from '../../products/context'
import { useContext, useEffect } from "react";

export const ProductGrid = () => {
    const { product, fetchAllProducts } = useContext(ProductContext);

    useEffect(() => {
      fetchAllProducts();
    }, []);

    return (
      <div className="container">
        <h3 className="mt-3">Últimos productos</h3>
        <div className="row">
          {product.map((product) => (
            <div key={product.id} className="col-md-6 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };