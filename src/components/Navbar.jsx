import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
    const logged = localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(logged);
    setIsAdmin(usuario && usuario.isAdmin === true);

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogeado");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const navLinks = isAdmin ? (
    <>
      <Link to="/administrador">HOME</Link>
      <Link to="/admin-productos">ADM. PRODUCTOS</Link>
      <Link to="/admin-usuarios">ADM. USUARIOS</Link>
      <button onClick={handleLogout} className="btn-logout">CERRAR SESIÓN</button>
    </>
  ) : (
    <>
      <Link to="/">HOME</Link>
      <Link to="/productos">PRODUCTOS</Link>
      <Link to="/ofertas">OFERTAS</Link>
      <Link to="/blogs">BLOGS</Link>
      <Link to="/contacto">CONTACTO</Link>
      {isLoggedIn ? (
        <>
          <Link to="/carrito">🛒 CARRITO</Link>
          <button onClick={handleLogout} className="btn-logout">CERRAR SESIÓN</button>
        </>
      ) : (
        <>
          <Link to="/login">INICIAR SESIÓN</Link>
          <Link to="/registro">REGISTRO</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">LevelUp</Link>
      </div>
      <div className="navbar-links">
        {navLinks}
      </div>
    </nav>
  );
}