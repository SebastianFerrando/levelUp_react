import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const obtenerClaveCarrito = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  return usuario ? `carrito_${usuario.correo}` : "carrito_anonimo";
};

export default function Checkout() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [correo, setCorreo] = useState("")

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if (usuario) {
      setNombre(usuario.nombre || "");
      setCorreo(usuario.correo || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || direccion.trim() === "" || tarjeta.trim() === "") {
      navigate("/compra-error");
      return;
    }

    const claveCarrito = obtenerClaveCarrito();
    localStorage.removeItem(claveCarrito);

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
        />

        <label>Dirección de envío</label>
        <input
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <label>Correo Electronico</label>
        <input
          value={correo}
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label>Número de tarjeta</label>
        <input
          type="number"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
        />

        <button type="submit" className="btn-ir mt-3 w-100">
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}