import { ProductContext } from '../../products/context';
import { ProductGrid} from '../components';
import { useContext, useEffect } from "react";

export const HomePage = () => {

  const { product, fetchAllProducts } = useContext(ProductContext);

    useEffect(() => {
      fetchAllProducts();
    }, []);

  return (
    <>
    <div>
      <div className="container mt-2">
        <div className="row">
          <ProductGrid product={product}/>
        </div>
      </div>

    </div>


    </>

  )
}
