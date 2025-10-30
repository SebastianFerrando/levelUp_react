import { Link } from "react-router-dom";

export default function CompraExitosa() {
  return (
    <div className="text-center" style={{ padding: "60px" }}>
      <h2 className="titulo">¡Compra Exitosa!</h2>
      <p>Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
      <Link to="/" className="btn-ir mt-3">Volver al inicio</Link>
    </div>
  );
}
