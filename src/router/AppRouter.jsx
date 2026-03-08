import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductsPage from "../pages/Products/ProductsPage";

// Proteccion de rutas
import ProtectedRoute from "../components/ProtectedRoute";


function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>


        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />


        {/* Ruta protegida */}
        <Route path="/dashboard" 
        element={
            <ProtectedRoute>
            <DashboardPage />
            </ProtectedRoute>
            } />



        <Route path="/products" element={
            <ProtectedRoute>
            <ProductsPage />
            </ProtectedRoute>
            } />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;