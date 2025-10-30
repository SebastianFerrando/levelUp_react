import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { obtenerProductoPorId, obtenerProductos } from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

export default function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState([]);

  useEffect(() => {
    inicializarProductos();

    const p = obtenerProductoPorId(id);
    setProducto(p);

    setTodosLosProductos(obtenerProductos());
  }, [id]);

  const productosRelacionados = useMemo(() => {
    if (!producto || !todosLosProductos.length) return [];

    return todosLosProductos
      .filter(p =>
        p.categoria === producto.categoria && 
        p.id !== producto.id
      )
      .slice(0, 4);
  }, [producto, todosLosProductos]);


  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito.find((i) => i.id === producto.id);
    let nuevo;

    if (item) {
      nuevo = carrito.map((i) =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevo));
    alert(`"${producto.nombre}" añadido al carrito.`);
  };

  if (!producto) {
    return <p style={{ color: "white", textAlign: "center" }}>Cargando producto...</p>;
  }

  return (
    <div className="container">
      <div className="detalle-container">
        <img src={producto.img} alt={producto.nombre} className="detalle-img" />
        <div className="detalle-info">
          <h2 className="titulo">{producto.nombre}</h2>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString()} CLP</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
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
                <Link to={`/detalle/${p.id}`} className="btn-ver">Ver detalle</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}