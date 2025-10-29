import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../js/crudProductos";

describe("Pruebas del CRUD de productos", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "productos",
      JSON.stringify([
        { id: "P1", nombre: "Teclado", precio: 10000, categoria: "Accesorios" },
      ])
    );
  });

  it("Debe agregar un producto nuevo", () => {
    crearProducto({ id: "P2", nombre: "Mouse", precio: 5000 });
    const productos = obtenerProductos();
    expect(productos.length).toBe(2);
  });

  it("Debe actualizar un producto existente", () => {
    actualizarProducto("P1", { precio: 15000 });
    const producto = obtenerProductos().find((p) => p.id === "P1");
    expect(producto.precio).toBe(15000);
  });

  it("Debe eliminar un producto", () => {
    eliminarProducto("P1");
    const productos = obtenerProductos();
    expect(productos.length).toBe(0);
  });
});
