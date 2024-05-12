import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {

    return (
      <div className="card" style={{ width: '15rem', margin: '10px' }}>
        <img src={"https://sony.scene7.com/is/image/sonyglobalsolutions/og?$categorypdpnav$&fmt=png-alpha"} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p  className=" description-div2">
            {product.productDescription.length > 45 ? `${product.productDescription.substring(0, 45)}...` : product.productDescription}
          </p>
          <Link className="btn btn-outline-dark text-dark" to={{pathname: `/ViewProduct/${product.id}/${product.productName}/${product.productDescription}/${product.selectedCategory}/${product.price}`}}> mas detalles</Link>
        </div>
      </div>
    );
};