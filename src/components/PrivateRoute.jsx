import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));

  // Si no hay sesión activa, redirige al login
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a esta página.");
    return <Navigate to="/login" replace />;
  }

  // Si se requiere rol admin y no lo tiene
  if (requireAdmin && usuario.rol !== "admin") {
    alert("Acceso denegado: solo administradores pueden ingresar.");
    return <Navigate to="/" replace />;
  }

  // Todo correcto → muestra el contenido
  return children;
}
