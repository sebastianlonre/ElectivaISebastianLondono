import { ViewMyProducts } from "../Components/ViewMyProducts"

export const MyProducts = () => {
  return (
    <>
    <div className="mt-3">
    <h3 className="m-3">Mis productos</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre del Producto</th>
            <th scope="col">Fecha de creacion</th>
            <th scope="col">Ultima Modificacion</th>
            <th scope="col" className="col-2"></th>
          </tr>
        </thead>
        <tbody>
        {<ViewMyProducts/>}
        </tbody>
      </table>
    </div>

    </>
  )
}
