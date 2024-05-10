import { ProductCard } from "./ProductCard";
import { ProductContext } from '../../products/context'
import { useContext, useEffect } from "react";

  export const ProductGrid = () => {

    const {product, fetchAllProducts} = useContext(ProductContext);
    useEffect(() => {
        fetchAllProducts();
    }, [])

    return (
        <div className="container text-center">
        <h2 className="m-5">Productos más vendidos</h2>
             <div className="row">
                {product.map(product => (
                    <div key={product.id} className="col-md-4 d-flex justify-content-center align-items-center">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
  };