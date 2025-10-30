// Leer todos los productos
export const obtenerProductos = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

// Crear nuevo producto
export const crearProducto = (producto) => {
  const productos = obtenerProductos();
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
  return { success: true, message: "Producto creado exitosamente." };
};

// Actualizar producto existente
export const actualizarProducto = (id, productoActualizado) => {
  const productos = obtenerProductos().map((p) =>
    p.id === id ? { ...p, ...productoActualizado } : p
  );
  localStorage.setItem("productos", JSON.stringify(productos));
  return { success: true, message: "Producto actualizado correctamente." };
};

// Eliminar producto
export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return { success: false, message: "Producto no encontrado." };
  }

  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  return { success: true, message: "Producto eliminado correctamente." };
};

// Buscar producto por ID
export const obtenerProductoPorId = (id) => {
  const productos = obtenerProductos();
  return productos.find((p) => p.id === id);
};
