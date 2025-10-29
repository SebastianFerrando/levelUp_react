// src/pages/Productos.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

// Función auxiliar para obtener la clave única del carrito basada en el usuario
const obtenerClaveCarrito = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  // Si hay un usuario, usa su correo; si no, usa una clave anónima.
  return usuario ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  
  // INICIALIZACIÓN: Carga el carrito específico del usuario actual
  const [carrito, setCarrito] = useState(() => {
    const clave = obtenerClaveCarrito();
    return JSON.parse(localStorage.getItem(clave)) || [];
  });

  useEffect(() => {
    inicializarProductos(); 
    setProductos(obtenerProductos());
    
    // Al montar, re-lee el carrito para asegurarse de que sea el correcto para el usuario
    const clave = obtenerClaveCarrito();
    setCarrito(JSON.parse(localStorage.getItem(clave)) || []);

  }, []);

  // OBTENER LISTA ÚNICA DE CATEGORÍAS (para el selector)
  const categorias = useMemo(() => {
    const lista = productos.map((p) => p.categoria);
    return ["todos", ...new Set(lista)];
  }, [productos]);

  // FILTRAR PRODUCTOS BASADO EN LA CATEGORÍA SELECCIONADA
  const productosFiltrados = productos.filter((p) => {
    if (categoriaSeleccionada === "todos") {
      return true;
    }
    // Asume que la propiedad 'categoria' existe en cada producto
    return p.categoria === categoriaSeleccionada; 
  });

  const guardarCarrito = (nuevo) => {
    const clave = obtenerClaveCarrito(); // Usa la clave actual del usuario/anónimo
    setCarrito(nuevo);
    localStorage.setItem(clave, JSON.stringify(nuevo));
  };

  const agregar = (p) => {
    const item = carrito.find((x) => x.id === p.id);
    let nuevo;
    if (item) {
      nuevo = carrito.map((x) =>
        x.id === p.id ? { ...x, cantidad: x.cantidad + 1 } : x
      );
    } else {
      nuevo = [...carrito, { ...p, cantidad: 1 }];
    }
    guardarCarrito(nuevo);
    alert(` "${p.nombre}" añadido al carrito.`);
  };

  const vaciar = () => guardarCarrito([]);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container">
      <h2 className="titulo text-center">Nuestros Productos</h2>

      {/* COMPONENTE DE FILTRADO DE CATEGORÍAS */}
      <div className="filter-controls">
        <label htmlFor="categoria-select">Filtrar por categoría:</label>
        <select
          id="categoria-select"
          className="form-control"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {productosFiltrados.map((p) => ( 
          <div key={p.id} className="card producto-card">
            <img src={p.img} alt={p.nombre} />
            <h5>{p.nombre}</h5>
            <p>${p.precio.toLocaleString()} CLP</p>
            <p>
              <small>{p.categoria}</small>
            </p>
            <button className="btn-ir" onClick={() => agregar(p)}>
              Añadir
            </button>
            <Link to={`/detalle/${p.id}`} className="btn-ver">
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}