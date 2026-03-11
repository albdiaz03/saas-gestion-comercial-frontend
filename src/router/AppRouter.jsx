import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ProductsPage from '../pages/Products/ProductsPage';

// Proteccion de rutas
import ProtectedRoute from '../components/ProtectedRoute';
import ClientsPage from '../pages/Clients/ClientsPage';
import SalesPage from '../pages/Sales/SalesPage';

// AppRouter → Lee la URL y decide qué página renderizar.
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />
        {/* Ruta protegida */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        {/*/ Route "/sales" → Activa la página de ventas cuando la URL es /sales.*/}
        <Route
          path="/sales"
          element={
            // ProtectedRoute → Verifica el token. Si no hay token, manda al login.
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
