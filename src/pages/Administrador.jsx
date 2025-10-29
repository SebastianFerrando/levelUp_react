import { useState, useEffect } from "react";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} from "../js/crudProductos";
import { inicializarProductos } from "../js/productos";

export default function Administrador() {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState({
    id: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    descuento: "",
    img: "",
  });

  // ✅ Cargar datos iniciales
  useEffect(() => {
    inicializarProductos();
    setProductos(obtenerProductos());
  }, []);

  // ✅ Manejar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActual({ ...productoActual, [name]: value });
  };

  // ✅ Crear o actualizar producto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productoActual.id || !productoActual.nombre || !productoActual.categoria || !productoActual.precio) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (modoEdicion) {
      actualizarProducto(productoActual.id, productoActual);
      alert("✅ Producto actualizado correctamente.");
    } else {
      const existente = productos.find((p) => p.id === productoActual.id);
      if (existente) {
        alert("❌ Ya existe un producto con ese ID.");
        return;
      }
      crearProducto(productoActual);
      alert("✅ Producto creado exitosamente.");
    }

    setProductoActual({
      id: "",
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      descuento: "",
      img: "",
    });
    setModoEdicion(false);
    setProductos(obtenerProductos());
  };

  // ✅ Eliminar producto
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      eliminarProducto(id);
      setProductos(obtenerProductos());
    }
  };

  // ✅ Editar producto
  const handleEditar = (p) => {
    setModoEdicion(true);
    setProductoActual(p);
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h3>Panel Admin</h3>
        <ul>
          <li><a href="#">Gestión de Productos</a></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h2 className="titulo">Gestión de Productos</h2>

        {/* Formulario */}
        <form className="form-container" onSubmit={handleSubmit}>
          <label>ID *</label>
          <input
            name="id"
            value={productoActual.id}
            onChange={handleChange}
            disabled={modoEdicion}
          />
          <label>Nombre *</label>
          <input name="nombre" value={productoActual.nombre} onChange={handleChange} />
          <label>Categoría *</label>
          <input name="categoria" value={productoActual.categoria} onChange={handleChange} />
          <label>Precio *</label>
          <input type="number" name="precio" value={productoActual.precio} onChange={handleChange} />
          <label>Stock</label>
          <input type="number" name="stock" value={productoActual.stock} onChange={handleChange} />
          <label>Descuento (%)</label>
          <input type="number" name="descuento" value={productoActual.descuento} onChange={handleChange} />
          <label>Imagen (URL)</label>
          <input name="img" value={productoActual.img} onChange={handleChange} />

          <button className="btn-ir mt-3" type="submit">
            {modoEdicion ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>

        {/* Tabla */}
        <table className="table table-dark table-striped mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descuento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td>{p.descuento}%</td>
                <td>
                  <button className="btn-ver me-2" onClick={() => handleEditar(p)}>Editar</button>
                  <button className="btn-ir" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
