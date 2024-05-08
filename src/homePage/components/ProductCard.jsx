import { Link } from "react-router-dom";

export const ProductCard = ({ imageUrl, title, description }) => {
    return (
      <div className="card" style={{ width: '15rem', margin: '10px' }}>
        <img src={imageUrl} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a className="btn btn-outline-dark text-dark">
            <Link className="nav-link" to='/ViewProduct'> mas detalles</Link>
          </a>
        </div>
      </div>
    );
};