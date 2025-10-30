import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import Detalle from "./pages/Detalle";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraError from "./pages/CompraError";
import Ofertas from "./pages/Ofertas";
import AdminHome from './pages/AdminHome';
import AdminProductos from './pages/AdminProductos';
import AdminUsuarios from './pages/AdminUsuarios';
import PrivateRoute from "./components/PrivateRoute";
import "./components/Carousel.css";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />
        <Route element={<PrivateRoute />}>
          {/* Home del administrador */}
          <Route path="/administrador" element={<AdminHome />} />
          {/* Rutas de gestión */}
          <Route path="/admin-productos" element={<AdminProductos />} />
          <Route path="/admin-usuarios" element={<AdminUsuarios />} />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

