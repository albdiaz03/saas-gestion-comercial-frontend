import AppLayout from '../../components/Layout/AppLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './Dashboard.css';

function DashboardPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5152/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
    };

    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="dashboard-container">
        {/* HEADER DEL DASHBOARD */}
        <div className="dashboard-header">
          <div className="dashboard-heading">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
        </div>

        {/* GRID DE TARJETAS */}

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-title">Message API</div>
            <div className="card-value">{message}</div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Products</div>
            <div className="card-value">0</div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Clients</div>
            <div className="card-value">0</div>
          </div>

          <div className="dashboard-card">
            <div className="card-title">Sales</div>
            <div className="card-value">$0</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
