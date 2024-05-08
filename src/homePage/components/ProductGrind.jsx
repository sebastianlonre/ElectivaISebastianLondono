import { ProductCard } from "./ProductCard";

  export const ProductGrid = () => {
    const products = [
      { id: 1, imageUrl: 'https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha', title: 'Product 1', description: 'Description of Product 1' },
      { id: 2, imageUrl: 'https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha', title: 'Product 2', description: 'Description of Product 2' },
      { id: 3, imageUrl: 'https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha', title: 'Product 3', description: 'Description of Product 3' },
      { id: 4, imageUrl: 'https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha', title: 'Product 3', description: 'Description of Product 3' },
      { id: 5, imageUrl: 'https://sony.scene7.com/is/image/sonyglobalsolutions/529_category?$goldenAreaImage$&fmt=png-alpha', title: 'Product 3', description: 'Description of Product 3' },
    ];

    return (
        <div className="container text-center">
        <h2 className="m-5">Productos más vendidos</h2>
             <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 d-flex justify-content-center align-items-center">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
  };