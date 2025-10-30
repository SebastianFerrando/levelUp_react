import React, { useState, useEffect } from "react";
import {
    obtenerProductos,
    crearProducto,
    eliminarProducto
} from "../js/crudProductos";
import { validarLongitud } from "../js/validaciones";

const CATEGORIAS_DISPONIBLES = ["Juegos de mesa", "Accesorios", "Componentes PC", "Consolas", "Software"];

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockCritico, setStockCritico] = useState("");
    const [categoria, setCategoria] = useState(CATEGORIAS_DISPONIBLES[0]);
    const [img, setImg] = useState("");

    useEffect(() => {
        recargarProductos();
    }, []);

    const recargarProductos = () => {
        setProductos(obtenerProductos());
    };

    // Al eliminar un producto, se actualiza localStorage.
    // La página Productos.jsx DEBE USAR useEffect para leer localStorage
    // cada vez que se carga/navega (ya lo hace con obtenerProductos()).
    const handleEliminarProducto = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
            const resultado = eliminarProducto(id);
            if (resultado.success) {
                alert(resultado.message);
                recargarProductos();
            } else {
                alert("Error: " + resultado.message);
            }
        }
    };

    const handleCrearProducto = (e) => {
        e.preventDefault();

        const precioNum = parseFloat(precio);
        const stockNum = parseInt(stock);
        const criticoNum = parseInt(stockCritico) || 0;

        if (!validarLongitud(codigo, 50, 3)) { alert("El código debe tener entre 3 y 50 caracteres."); return; }
        if (!validarLongitud(nombre, 100, 1)) { alert("El nombre es obligatorio y debe tener máximo 100 caracteres."); return; }
        if (!validarLongitud(descripcion, 500, 0)) { alert("La descripción no puede superar los 500 caracteres."); return; }
        if (isNaN(precioNum) || precioNum <= 0) { alert("El precio debe ser un número positivo."); return; }
        if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) { alert("El stock debe ser un número entero mayor o igual a 0."); return; }
        if (isNaN(criticoNum) || criticoNum < 0 || !Number.isInteger(criticoNum)) { alert("El stock crítico debe ser un número entero mayor o igual a 0."); return; }
        if (!categoria) { alert("Debe seleccionar una categoría."); return; }
        if (!validarLongitud(img, 500, 5)) { alert("Debe proporcionar una URL de imagen válida (mínimo 5 caracteres)."); return; }

        const nuevoProducto = {
            codigo: codigo.trim(), nombre: nombre.trim(), descripcion: descripcion.trim(),
            precio: precioNum, stock: stockNum, stockCritico: criticoNum,
            categoria: categoria, img: img.trim()
        };

        const resultado = crearProducto(nuevoProducto);

        if (resultado.success) {
            alert(resultado.message);
            recargarProductos();
            setCodigo(""); setNombre(""); setDescripcion(""); setPrecio("");
            setStock(""); setStockCritico(""); setImg("");
        } else {
            alert("Error: " + resultado.message);
        }
    };

    return (
        <div className="container p-4">
            <h1 className="titulo text-center">Administración de Productos</h1>

            <div className="form-container mb-5 p-4" style={{ border: '2px solid #39ff14', borderRadius: '10px' }}>
                <h2 className="sub-titulo text-center" style={{ color: '#00ffff' }}>Crear Nuevo Producto</h2>
                <form onSubmit={handleCrearProducto}>
                    <div className="grid-2-cols">
                        <label>Código Único:</label>
                        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />

                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                        <label>Precio:</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required min="1" step="0.01" />

                        <label>Stock:</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" step="1" />

                        <label>Stock Crítico (Opcional):</label>
                        <input type="number" value={stockCritico} onChange={(e) => setStockCritico(e.target.value)} min="0" step="1" />

                        <label>Categoría:</label>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                            {CATEGORIAS_DISPONIBLES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <label className="mt-3">URL Imagen:</label>
                    <input type="text" value={img} onChange={(e) => setImg(e.target.value)} required />

                    <label>Descripción:</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" />

                    <button type="submit" className="btn-ir mt-4 w-100">Registrar Producto</button>
                </form>
            </div>

            <hr style={{ borderColor: '#39ff14' }} />

            <h2 className="sub-titulo text-center" style={{ color: '#00ffff', marginTop: '40px' }}>Productos Registrados ({productos.length})</h2>

            <div className="table-responsive">
                <table className="table table-dark table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.codigo}</td>
                                <td>{p.nombre}</td>
                                <td>${p.precio.toLocaleString()}</td>
                                <td style={{ color: p.stock <= p.stockCritico ? '#ff4444' : '#39ff14' }}>
                                    {p.stock} {p.stock <= p.stockCritico && '(Crítico!)'}
                                </td>
                                <td>{p.categoria}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarProducto(p.id, p.nombre)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {productos.length === 0 && (<p className="text-center mt-3" style={{ color: '#aaa' }}>No hay productos registrados.</p>)}
        </div>
    );
}