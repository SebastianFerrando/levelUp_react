import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // FUNCIÓN CENTRAL PARA CHEQUEAR LA SESIÓN
  const checkLoginStatus = () => {
    const usuarioString = localStorage.getItem("usuarioLogeado");
    const logged = localStorage.getItem("isLoggedIn") === "true";

    let usuario = null;
    if (usuarioString) {
      try {
        usuario = JSON.parse(usuarioString);
      } catch (error) {
        // Manejar error de JSON, si existe
        console.error("Error al parsear usuario logeado:", error);
      }
    }

    // Actualizar estados
    setIsLoggedIn(logged);
    setIsAdmin(usuario && usuario.isAdmin === true);
  };

  useEffect(() => {

    checkLoginStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogeado");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  // --- CONTENIDO DEL NAVBAR ---
  const navLinks = isAdmin ? (
    <>
      <Link to="/administrador">BIENVENIDO ADMIN</Link>
      <Link to="/admin-productos">ADM. PRODUCTOS</Link>
      <Link to="/admin-usuarios">ADM. USUARIOS</Link>
      <button onClick={handleLogout} className="btn-logout">CERRAR SESIÓN</button>
    </>
  ) : (
    // MODO USUARIO/PÚBLICO
    <>
      <Link to="/">HOME</Link>
      <Link to="/productos">PRODUCTOS</Link>
      <Link to="/ofertas">OFERTAS</Link>
      <Link to="/blogs">BLOGS</Link>
      <Link to="/contacto">CONTACTO</Link>
      {isLoggedIn ? (
        <>
          <Link to="/carrito"><span className="emoji-icon">🛒</span></Link>
          <button onClick={handleLogout} className="btn-logout">CERRAR SESIÓN</button>
        </>
      ) : (
        <>
          <Link to="/registro">REGISTRO</Link>
          <Link to="/login">INICIAR SESIÓN</Link>
          <Link to="/carrito"><span className="emoji-icon">🛒</span></Link>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        
        <Link to={isAdmin ? "/administrador" : "/"}><img className="logo" src="/img/logo.png"/>LevelUp Gamer</Link>
      </div>
      <div className="navbar-links">
        {navLinks}
      </div>
    </nav>
  );
}