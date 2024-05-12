import { useNavigate } from "react-router-dom";
import { reviewRate } from "../../reviews/components/reviewRate";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const avgRating = reviewRate(product.id);

  const handleViewProduct = () => {
    navigate(`/ViewProduct/${product.id}/${product.productName}/${product.productDescription}/${product.selectedCategory}/${product.price}`)
  };

  return (
    <div className="card mb-2" style={{ maxWidth: "500px", cursor: "pointer" }} onClick={handleViewProduct}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={"https://sony.scene7.com/is/image/sonyglobalsolutions/og?$categorypdpnav$&fmt=png-alpha"} className="card-img" alt="Product" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex">
              <h5 className="card-title">{product.productName}</h5>
            </div>
            <p className="card-text" >{product.productDescription.length > 35 ? `${product.productDescription.substring(0, 35)}...` : product.productDescription}</p>
            <p className="price-text">${product.price}</p>
            <p className="card-text"><small className="text-muted">{avgRating} ⭐</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};
