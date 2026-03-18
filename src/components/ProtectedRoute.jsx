import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Busca el token guardado en el navegador
  // Este token se guardó cuando el usuario hizo login
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // Si NO existe token significa que el usuario no está autenticado ojo aqui
  if (!token) {
    // redirecciona al path vacio
    return <Navigate to="/" />;
  }
  // Si el token existe, permite mostrar la página protegida
  return children;
}

export default ProtectedRoute;