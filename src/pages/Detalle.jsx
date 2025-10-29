import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { obtenerProductoPorId, obtenerProductos } from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

export default function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState([]); // Nuevo estado para todos los productos

  useEffect(() => {
    inicializarProductos();

    // Obtener el producto principal
    const p = obtenerProductoPorId(id);
    setProducto(p);

    // Obtener todos los productos para la sección "Relacionados"
    setTodosLosProductos(obtenerProductos());
  }, [id]); // El useEffect se ejecuta cada vez que el ID de la URL cambia

  // Lógica para encontrar productos relacionados (misma categoría, excluyendo el actual)
  const productosRelacionados = useMemo(() => {
    if (!producto || !todosLosProductos.length) return [];

    return todosLosProductos
      .filter(p =>
        p.categoria === producto.categoria && // Misma categoría
        p.id !== producto.id // Excluir el producto actual
      )
      .slice(0, 4); // Limitar a 4 productos relacionados
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
    alert(`✅ "${producto.nombre}" añadido al carrito.`);
  };

  if (!producto) {
    return <p style={{ color: "white", textAlign: "center" }}>Cargando producto...</p>;
  }

  return (
    <div className="container">
      {/* SECCIÓN DETALLE PRINCIPAL */}
      <div className="detalle-container">
        {/* La ruta de la imagen debe ser absoluta: /img/... */}
        <img src={producto.img} alt={producto.nombre} className="detalle-img" />
        <div className="detalle-info">
          <h2 className="titulo">{producto.nombre}</h2>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString()} CLP</p>
          {/* Se asume que la propiedad .categoria ya está en los datos */}
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p>{producto.descripcion}</p>
          <button className="btn-ir mt-3" onClick={agregarAlCarrito}>
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* SECCIÓN PRODUCTOS RELACIONADOS */}
      {productosRelacionados.length > 0 && (
        <div className="productos-relacionados mt-5">
          <h3 className="titulo text-center">Productos Relacionados</h3>
          <div className="grid"> {/* Usando tu clase grid para las tarjetas */}
            {productosRelacionados.map((p) => (
              <div key={p.id} className="card producto-card">
                <img src={p.img} alt={p.nombre} />
                <h5>{p.nombre}</h5>
                <p>${p.precio.toLocaleString()} CLP</p>
                {/* Usamos Link para navegar al detalle del nuevo producto */}
                <Link to={`/detalle/${p.id}`} className="btn-ver">Ver detalle</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}