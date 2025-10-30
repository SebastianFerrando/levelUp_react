import React, { useState, useEffect } from "react";
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../js/crudProductos";
import { validarLongitud } from "../js/validaciones";

const CATEGORIAS_DISPONIBLES = [
    "Juegos de mesa",
    "Accesorios",
    "Componentes PC",
    "Consolas",
    "Software"
];

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockCritico, setStockCritico] = useState("");
    const [categoria, setCategoria] = useState(CATEGORIAS_DISPONIBLES[0]);
    const [img, setImg] = useState("");
    const [codigo, setCodigo] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        recargarProductos();
    }, []);

    const recargarProductos = () => {
        setProductos(obtenerProductos());
    };

    const handleEliminarProducto = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
            try {
                eliminarProducto(id);
                recargarProductos();
                alert(`Producto "${nombre}" eliminado correctamente.`);
            } catch (error) {
                alert("Error al eliminar el producto.");
            }
        }
    };

    const handleCrearOEditarProducto = (e) => {
        e.preventDefault();

        const precioNum = parseFloat(precio);
        const stockNum = stock === "" ? 0 : parseInt(stock);
        const criticoNum = stockCritico === "" ? 0 : parseInt(stockCritico);

        if (!validarLongitud(nombre, 100, 1)) { alert("El nombre es obligatorio y debe tener máximo 100 caracteres."); return; }
        if (!validarLongitud(descripcion, 500, 0)) { alert("La descripción no puede superar los 500 caracteres."); return; }
        if (isNaN(precioNum) || precioNum <= 0) { alert("El precio debe ser un número positivo."); return; }
        if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) { alert("El stock debe ser un número entero mayor o igual a 0."); return; }
        if (isNaN(criticoNum) || criticoNum < 0 || !Number.isInteger(criticoNum)) { alert("El stock crítico debe ser un número entero mayor o igual a 0."); return; }
        if (stockNum < criticoNum) { alert("El stock no puede ser menor que el stock crítico."); return; }
        if (!categoria) { alert("Debe seleccionar una categoría."); return; }
        if (img && !validarLongitud(img, 500, 5)) { alert("Si proporciona imagen, debe ser una URL válida (mínimo 5 caracteres)."); return; }
        if (!validarLongitud(codigo, 50, 3)) { alert("El código debe tener entre 3 y 50 caracteres."); return; }

        let productosActuales = obtenerProductos();

        if (editandoId) {
            // Editar producto existente
            productosActuales = productosActuales.map(p =>
                p.id === editandoId
                    ? {
                        ...p,
                        nombre: nombre.trim(),
                        descripcion: descripcion.trim(),
                        precio: precioNum,
                        stock: stockNum,
                        stockCritico: criticoNum,
                        categoria: categoria,
                        img: img.trim() || "https://via.placeholder.com/150",
                        codigo: codigo.trim()
                    }
                    : p
            );
            localStorage.setItem("productos", JSON.stringify(productosActuales));
            alert("Producto actualizado correctamente.");
            setEditandoId(null);
        } else {
            // Crear producto nuevo
            const nuevoProducto = {
                id: productosActuales.length > 0 
                    ? Math.max(...productosActuales.map(p => p.id)) + 1 
                    : 1,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                precio: precioNum,
                stock: stockNum,
                stockCritico: criticoNum,
                categoria: categoria,
                img: img.trim() || "https://via.placeholder.com/150",
                codigo: codigo.trim()
            };
            productosActuales.push(nuevoProducto);
            localStorage.setItem("productos", JSON.stringify(productosActuales));
            alert("Producto creado exitosamente.");
        }

        recargarProductos();
        limpiarFormulario();
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setStock("");
        setStockCritico("");
        setCategoria(CATEGORIAS_DISPONIBLES[0]);
        setImg("");
        setCodigo("");
        setEditandoId(null);
    };

    const handleEditar = (producto) => {
        setEditandoId(producto.id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setStockCritico(producto.stockCritico);
        setCategoria(producto.categoria);
        setImg(producto.img);
        setCodigo(producto.codigo);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="admin-container">
            <h1 className="titulo text-center">Administración de Productos</h1>

            <div className="form-container">
                <h2 className="sub-titulo text-center">
                    {editandoId ? "Editar Producto" : "Crear Nuevo Producto"}
                </h2>

                <form onSubmit={handleCrearOEditarProducto} className="form-admin">

                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Precio:</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required min="1" step="0.01" />
                    </div>

                    <div className="form-group">
                        <label>Stock:</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0" step="1" />
                    </div>

                    <div className="form-group">
                        <label>Stock Crítico (opcional):</label>
                        <input type="number" value={stockCritico} onChange={(e) => setStockCritico(e.target.value)} min="0" step="1" />
                    </div>

                    <div className="form-group">
                        <label>Categoría:</label>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                            {CATEGORIAS_DISPONIBLES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>URL Imagen (opcional):</label>
                        <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" />
                    </div>

                    <div className="form-group">
                        <label>Código:</label>
                        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn-ir">
                        {editandoId ? "Guardar Cambios" : "Registrar Producto"}
                    </button>

                    {editandoId && (
                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={limpiarFormulario}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <h2 className="sub-titulo text-center">Productos Registrados ({productos.length})</h2>

            <div className="table-responsive">
                <table className="table-admin">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.codigo}</td>
                                <td>{p.nombre}</td>
                                <td>${p.precio.toLocaleString()}</td>
                                <td className={p.stock <= (p.stockCritico || 0) ? 'stock-critico' : 'stock-normal'}>
                                    {p.stock} {p.stockCritico > 0 && p.stock <= p.stockCritico && '(Crítico!)'}
                                </td>
                                <td>{p.categoria}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleEditar(p)}>Editar</button>{" "}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProducto(p.id, p.nombre)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {productos.length === 0 && <p className="no-productos">No hay productos registrados.</p>}
        </div>
    );
}
