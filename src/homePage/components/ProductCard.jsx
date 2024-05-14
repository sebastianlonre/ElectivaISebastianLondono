import { useNavigate } from "react-router-dom";
import { reviewRate } from "../../reviews/components/reviewRate";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const avgRating = reviewRate(product.id);

  const handleViewProduct = () => {
    navigate(`/ViewProduct/${product.id}`, { state: { product } });
  };

  return (
    <div className="card mb-2" style={{ maxWidth: "500px", cursor: "pointer" }} onClick={handleViewProduct}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="div-IMG-cart">
            <img src={product.imgURL} className="card-img" alt="Product" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
            <p className="card-text" >{product.productDescription.length > 35 ? `${product.productDescription.substring(0, 35)}...` : product.productDescription}</p>
            <p className="price-text">${product.price}</p>
            <div className="d-flex">
              <p className="card-text"><small className="text-muted">{avgRating} ⭐</small></p>
              <p className="card-text"><small className="text-muted ">subido: {product.updatedAt}</small></p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
