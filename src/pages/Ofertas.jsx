// src/pages/Ofertas.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../js/crudProductos"; // Necesitas esta función
import { inicializarProductos } from "../js/productos"; // Si lo usas para asegurar la carga

// Constante para el descuento global en ofertas
const DESCUENTO_OFERTA = 0.20; // 20% de descuento

export default function Ofertas() {
  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    // Aseguramos que la lista de productos esté cargada
    inicializarProductos(); 
    
    // Obtenemos todos los productos
    const productosBase = obtenerProductos();
    
    // Filtramos para obtener solo algunos productos para las ofertas (ej. los 6 más caros)
    const ofertasSeleccionadas = productosBase
      .sort((a, b) => b.precio - a.precio) // Ordenar por precio descendente
      .slice(0, 6) // Tomar los primeros 6
      .map(p => {
        const precioOriginal = p.precio;
        const precioOferta = Math.round(precioOriginal * (1 - DESCUENTO_OFERTA));
        return {
          ...p,
          precioOriginal,
          precio: precioOferta, // Reemplazamos el precio para el carrito/detalle
          descuento: DESCUENTO_OFERTA * 100 // Para mostrar en el card
        };
      });

    setProductos(ofertasSeleccionadas);

  }, []);

  // NOTA: Para que estos productos se puedan añadir al carrito, 
  // necesitarías importar la función 'agregar' de Productos.jsx o implementarla aquí.
  // Por ahora, solo mostraremos la oferta y un botón para 'Ver detalle'.
  
  return (
    <div className="container">
      <h2 className="titulo text-center">🔥 ¡Ofertas del Mes! 🔥</h2>
      <p className="text-center" style={{ color: '#ff0044', fontSize: '1.2rem', marginBottom: '30px' }}>
        Aprovecha un {DESCUENTO_OFERTA * 100}% de descuento en estos productos seleccionados.
      </p>

      <div className="grid">
        {productos.map((p) => ( 
          <div key={p.id} className="card oferta-card">
            <img src={p.img} alt={p.nombre} />
            <h5 style={{ textDecoration: 'underline' }}>{p.nombre}</h5>
            
            <div style={{ margin: '10px 0' }}>
                <p style={{ textDecoration: 'line-through', color: '#ff4444', fontSize: '0.9rem' }}>
                    Precio Normal: ${p.precioOriginal.toLocaleString()} CLP
                </p>
                <p style={{ color: '#39ff14', fontSize: '1.3rem', fontWeight: 'bold' }}>
                    ¡OFERTA!: ${p.precio.toLocaleString()} CLP
                </p>
                <span className="badge-oferta" style={{ 
                    backgroundColor: '#ff0044', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '5px',
                    fontWeight: 'bold'
                }}>
                    -{p.descuento}%
                </span>
            </div>
            
            <Link to={`/detalle/${p.id}`} className="btn-ver">
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}