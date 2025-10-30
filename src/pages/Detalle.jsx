import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { obtenerProductoPorId, obtenerProductos } from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

const obtenerClaveCarrito = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const usuario = isLoggedIn
    ? JSON.parse(localStorage.getItem("usuarioLogeado"))
    : null;
  return usuario?.correo ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
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

    const idNum = parseInt(id, 10); // convertir id a número
    const p = obtenerProductoPorId(idNum);
    setProducto(p);

    setTodosLosProductos(obtenerProductos());

    const clave = obtenerClaveCarrito();
    setCarrito(JSON.parse(localStorage.getItem(clave)) || []);
  }, [id]);

  const productosRelacionados = useMemo(() => {
    if (!producto || !todosLosProductos.length) return [];

    return todosLosProductos
      .filter(
        (p) => p.categoria.toLowerCase() === producto.categoria.toLowerCase() && p.id !== producto.id
      )
      .slice(0, 4);
  }, [producto, todosLosProductos]);

  const agregarAlCarrito = () => {
    if (!producto) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    const item = carrito.find((x) => x.id === producto.id);
    let nuevo;
    if (item) {
      nuevo = carrito.map((x) =>
        x.id === producto.id ? { ...x, cantidad: x.cantidad + 1 } : x
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }
    guardarCarrito(nuevo);

    alert(`"${producto.nombre}" añadido al carrito.`);
    window.dispatchEvent(new Event("storage"));
  };

  if (!producto) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Cargando producto...
      </p>
    );
  }

  return (
    <div className="container">
      <div className="detalle-container">
        <img src={producto.img} alt={producto.nombre} className="detalle-img" />
        <div className="detalle-info">
          <h2 className="titulo">{producto.nombre}</h2>
          <p>
            <strong>Precio:</strong> ${producto.precio.toLocaleString()} CLP
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>
          <p>{producto.descripcion}</p>
          <button className="btn-ir mt-3" onClick={agregarAlCarrito}>
            Añadir al carrito
          </button>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <div className="productos-relacionados mt-5">
          <h3 className="titulo text-center">Productos Relacionados</h3>
          <div className="grid">
            {productosRelacionados.map((p) => (
              <div key={p.id} className="card producto-card">
                <img src={p.img} alt={p.nombre} />
                <h5>{p.nombre}</h5>
                <p>${p.precio.toLocaleString()} CLP</p>
                <Link to={`/detalle/${p.id}`} className="btn-ver">
                  Ver detalle
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
