// src/pages/Checkout.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Función auxiliar para obtener la clave única del carrito (¡IDÉNTICA a la usada en otros componentes!)
const obtenerClaveCarrito = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  return usuario ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Checkout() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");

  // 💾 Al montar el componente, verificar si hay usuario logueado
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if (usuario) {
      // Aseguramos que se usan los valores del usuario logueado para autocompletar
      setNombre(usuario.nombre || "");
      setDireccion(usuario.direccion || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validaciones
    if (nombre.trim() === "" || direccion.trim() === "" || tarjeta.trim() === "") {
      alert("Por favor completa todos los campos.");
      // Navega a la página de error si hay campos vacíos
      navigate("/compra-error");
      return;
    }

    // **NOTA:** Aquí es donde deberías integrar tu función de validación de formulario, 
    // pero como aún no la revisamos, mantendremos la validación simple por ahora.

    // 2. COMPRA EXITOSA: Limpiar el carrito específico
    const claveCarrito = obtenerClaveCarrito();
    localStorage.removeItem(claveCarrito); // <--- CORRECCIÓN CRÍTICA

    // 3. Navegar a éxito
    navigate("/compra-exitosa");
  };

  return (
    <div className="form-container">
      <h2 className="titulo text-center">Finalizar Compra</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Dirección de envío</label>
        <input
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <label>Número de tarjeta</label>
        <input
          type="number"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
          required
        />

        <button type="submit" className="btn-ir mt-3 w-100">
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}