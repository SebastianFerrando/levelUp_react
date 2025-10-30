import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

const obtenerClaveCarrito = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const usuario = isLoggedIn
    ? JSON.parse(localStorage.getItem("usuarioLogeado"))
    : null;
  return usuario?.correo ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [carrito, setCarrito] = useState(() => {
    const clave = obtenerClaveCarrito();
    return JSON.parse(localStorage.getItem(clave)) || [];
  });

  const guardarCarrito = (nuevo) => {
  const clave = obtenerClaveCarrito();
  setCarrito(nuevo);
  localStorage.setItem(clave, JSON.stringify(nuevo));
  };

  useEffect(() => {
    inicializarProductos();
    setProductos(obtenerProductos());
    const clave = obtenerClaveCarrito();
    setCarrito(JSON.parse(localStorage.getItem(clave)) || []);
  }, []);

  const categorias = useMemo(() => {
    const lista = productos.map((p) => p.categoria);
    return ["todos", ...new Set(lista)];
  }, [productos]);

  const productosFiltrados = productos.filter((p) => {
    if (categoriaSeleccionada === "todos") return true;
    return p.categoria === categoriaSeleccionada;
  });

  const agregar = (p) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

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
    alert(`"${p.nombre}" añadido al carrito.`);
    window.dispatchEvent(new Event("storage"));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container">
      <h2 className="titulo text-center">Nuestros Productos</h2>

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
            <p><small>{p.categoria}</small></p>
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
