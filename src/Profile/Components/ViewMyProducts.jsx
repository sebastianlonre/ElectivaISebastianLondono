import { ColumButtons } from "./ColumButtons";

export const ViewMyProducts = () => {
  const products = [
    { id: 1, name: 'Cámara', createDateProduct: '10', updateDateProduct: '15', description: 'afasfsafsafsaf'},
    { id: 2, name: 'Teléfono', createDateProduct: '20', updateDateProduct: '25',description: 'afasfsafsafsaf' },
    { id: 3, name: 'Tablet', createDateProduct: '30', updateDateProduct: '35', description: 'afasfsafsafsaf' }
  ];
  return (
    <>
    {products.map(product => (
          <tr key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.name}</td>
            <td>{product.createDateProduct}</td>
            <td>{product.updateDateProduct}</td>
            <td>
              <ColumButtons product={product}/>
            </td>
          </tr>
        ))}
    </>
  )
}
