import { ViewMyProducts } from "../Components/ViewMyProducts";

export const MyProducts = () => {
  return (
    <div className="container mt-3">
      <h3 className="mb-3 text-center font-weight-bold">Mis productos</h3>
      <br />
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Nombre del Producto</th>
              <th className="text-center">Fecha de creación</th>
              <th className="text-center">Última Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <ViewMyProducts />
          </tbody>
        </table>
      </div>
    </div>
  );
};
