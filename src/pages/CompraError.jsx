import { Link } from "react-router-dom";

export default function CompraError() {
  return (
    <div className="text-center" style={{ padding: "60px" }}>
      <h2 className="titulo">Error en la Compra</h2>
      <p>No se pudo procesar el pago. Revisa los datos ingresados e inténtalo nuevamente.</p>
      <Link to="/checkout" className="btn-ir mt-3">Volver al Checkout</Link>
    </div>
  );
}
