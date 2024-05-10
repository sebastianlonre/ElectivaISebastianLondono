import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {

    return (
      <div className="card" style={{ width: '15rem', margin: '10px' }}>
        <img src={"https://sony.scene7.com/is/image/sonyglobalsolutions/og?$categorypdpnav$&fmt=png-alpha"} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.productDescription}</p>
          <a className="btn btn-outline-dark text-dark">
            <Link className="nav-link" to={{pathname: `/ViewProduct/${product.id}`}}> mas detalles</Link>
          </a>
        </div>
      </div>
    );
};