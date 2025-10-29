// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css"; // Asegúrate de tener los estilos del dropdown aquí

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Lee el estado del usuario cada vez que el componente se monta/re-renderiza
  // Esto asegura que el Navbar se actualice después de iniciar sesión o cerrar sesión.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogeado"));
    setUsuario(user);
  }, [navigate]); // navigate como dependencia asegura que el hook se re-evalúe al navegar.

  const logout = () => {
    const usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"));

    // 1. ELIMINAR EL CARRITO ESPECÍFICO DEL USUARIO
    if (usuarioLogeado && usuarioLogeado.correo) {
      // Clave única basada en el correo
      const claveCarritoUsuario = `carrito_${usuarioLogeado.correo}`;
      localStorage.removeItem(claveCarritoUsuario);
    }

    // 2. ELIMINAR LA SESIÓN
    localStorage.removeItem("usuarioLogeado");
    
    // 3. Forzar la re-renderización y navegar a la página de login
    navigate("/login"); 
  };

  const handleDropdownToggle = (open) => {
    setIsProductsDropdownOpen(open);
  };

  const closeDropdownAndNavigate = (path) => {
    setIsProductsDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/img/logo.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">LEVEL-UP GAMER</span>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        
        {/* ENLACE DE PRODUCTOS CON DESPLEGABLE */}
        <li
          className="dropdown"
          onMouseEnter={() => handleDropdownToggle(true)}
          onMouseLeave={() => handleDropdownToggle(false)}
        >
          <Link to="/productos" className="dropdown-link">Productos</Link>
          
          {isProductsDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link 
                  to="/ofertas" 
                  onClick={() => closeDropdownAndNavigate("/ofertas")}
                >
                  Ofertas
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* ENLACES PRINCIPALES */}
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/carrito">Carrito</Link></li> 
        
        {/* ENLACES CONDICIONALES */}
        {usuario ? (
          <>
            <li><button onClick={logout} className="btn-logout">Cerrar Sesión</button></li>
          </>
        ) : (
          <>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}