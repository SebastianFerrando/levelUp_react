import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [carritoCount, setCarritoCount] = useState(0);

  const getCartKey = () => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const usuario = logged ? JSON.parse(localStorage.getItem("usuarioLogeado")) : null;
    return logged && usuario?.correo ? `carrito_${usuario.correo}` : "carrito_anonimo";
  };

  const leerCarrito = () => {
    const clave = getCartKey();
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];
    const total = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    setCarritoCount(total);
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
    const logged = localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(logged);
    setIsAdmin(usuario && usuario.isAdmin === true);

    leerCarrito();

    // Escucha cambios de carrito y sesión en otras pestañas
    const onStorage = () => {
      const u = JSON.parse(localStorage.getItem("usuarioLogeado"));
      const l = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(l);
      setIsAdmin(u && u.isAdmin === true);
      leerCarrito();
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogeado");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setCarritoCount(0);
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
          <Link to="/carrito">🛒 CARRITO ({carritoCount})</Link>
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
