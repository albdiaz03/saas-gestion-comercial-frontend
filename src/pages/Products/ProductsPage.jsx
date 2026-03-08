import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>z
      <h2>Productos Empresa 1</h2>
      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - ${p.price} - Stock: {p.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsPage;