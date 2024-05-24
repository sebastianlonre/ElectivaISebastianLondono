import { useModal } from "../../modals/hooks/useModal";
import { EditMyProduct } from "../../modals";
import { ProductContext } from "../../products/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const ColumButtons = ({ product }) => {
  const { deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const EditModal = useModal();

  const handleViewProduct = () => {
    navigate(`/ViewProduct/${product.id}`, { state: { product } });
  };

  const editProduct = () => {
    EditModal.openModal();
  };

  const deleteProductACC = async () => {
    await deleteProduct(product);
    location.reload();
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Botones de Producto">
        <button
          type="button"
          className="btn btn-outline-dark text-dark"
          onClick={handleViewProduct}
        >
          Ver
        </button>
        <button
          type="button"
          className="btn btn-outline-dark text-dark"
          onClick={editProduct}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteProductACC}
        >
          Eliminar
        </button>
      </div>
      <EditMyProduct
        isOpen={EditModal.isOpen}
        onClose={EditModal.closeModal}
        product={product}
      />
    </>
  );
};
