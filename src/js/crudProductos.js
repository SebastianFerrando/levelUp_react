export const obtenerProductos = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

// Crear nuevo producto
export const crearProducto = (producto) => {
  const productos = obtenerProductos();
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Actualizar producto existente
export const actualizarProducto = (id, productoActualizado) => {
  const productos = obtenerProductos().map((p) =>
    p.id === id ? { ...p, ...productoActualizado } : p
  );
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Eliminar producto
export const eliminarProducto = (id) => {
  const productos = obtenerProductos().filter((p) => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Buscar producto por ID
export const obtenerProductoPorId = (id) => {
  const productos = obtenerProductos();
  return productos.find((p) => p.id === id);
};
