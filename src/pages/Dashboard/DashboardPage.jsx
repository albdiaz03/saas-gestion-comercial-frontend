import AppLayout from '../../components/Layout/AppLayout';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/dashboardService';
import './Dashboard.css';

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  const totalProductos = products.length;
  const productosActivos = products.filter((p) => p.isActive).length;
  const stockBajo = products.filter((p) => p.stock <= 5).length;
  const valorInventario = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0
  );

  return (

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-title">Total Productos</div>
            <div className="card-value">{loading ? '...' : totalProductos}</div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Stock Bajo</div>
            <div className="card-value">{loading ? '...' : stockBajo}</div>
            {!loading && stockBajo > 0 && (
              <div className="card-alert">⚠ revisar</div>
            )}
          </div>

          <div className="dashboard-card">
            <div className="card-title">Total Clientes</div>
            <div className="card-value card-pending">—</div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Ingresos del mes</div>
            <div className="card-value card-pending">—</div>
          </div>


        </div>
      </div>
  
  );
}

export default DashboardPage;
