import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ProductsPage from '../pages/Products/ProductsPage';
import ClientsPage from '../pages/Clients/ClientsPage';
import SalesPage from '../pages/Sales/SalesPage';

import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../components/Layout/AppLayout';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<LoginPage />} />

        {/* PROTECTED + LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;