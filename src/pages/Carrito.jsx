import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const obtenerClaveCarrito = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  return usuario ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Carrito() {
  const navigate = useNavigate();
  
  const [carrito, setCarrito] = useState(() => {
    const clave = obtenerClaveCarrito();
    return JSON.parse(localStorage.getItem(clave)) || [];
  });

  const guardarCarrito = (nuevo) => {
    const clave = obtenerClaveCarrito();
    setCarrito(nuevo);
    localStorage.setItem(clave, JSON.stringify(nuevo));
  };
  
  
  const vaciar = () => guardarCarrito([]);

  const eliminarItem = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevo);
  };

  const ajustarCantidad = (id, delta) => {
    const nuevo = carrito.map((item) => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
      }
      return item;
    }).filter(Boolean);
    
    guardarCarrito(nuevo);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container">
      <h2 className="titulo text-center">Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío. ¡Añade algunos productos!</p>
      ) : (
        <>
          <div className="carrito-items">
            {carrito.map((item) => (
              <div key={item.id} className="item-card">
                <img src={item.img} alt={item.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                <div className="item-info">
                  <h5>{item.nombre}</h5>
                  <p>Precio Unitario: ${item.precio.toLocaleString()} CLP</p>
                  <p>Subtotal: ${(item.precio * item.cantidad).toLocaleString()} CLP</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => ajustarCantidad(item.id, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => ajustarCantidad(item.id, 1)}>+</button>
                  <button onClick={() => eliminarItem(item.id)} className="btn-eliminar">❌</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carrito-resumen mt-4 text-center">
            <h3>Total: ${total.toLocaleString()} CLP</h3>
            <button onClick={vaciar} className="btn-ir">Vaciar Carrito</button>
            <Link to="/checkout" className="btn-ir ml-2">Proceder al Pago</Link>
          </div>
        </>
      )}
    </div>
  );
}