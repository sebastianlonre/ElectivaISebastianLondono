import { ColumButtons } from "./ColumButtons";

export const ViewMyProducts = () => {
  const products = [
    { id: 1, name: 'Cámara', yesterday: '10', today: '15' },
    { id: 2, name: 'Teléfono', yesterday: '20', today: '25' },
    { id: 3, name: 'Tablet', yesterday: '30', today: '35' }
  ];
  return (
    <>
    {products.map(product => (
          <tr key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.name}</td>
            <td>{product.yesterday}</td>
            <td>{product.today}</td>
            <td>
              <ColumButtons/>
            </td>
          </tr>
        ))}
    </>
  )
}
