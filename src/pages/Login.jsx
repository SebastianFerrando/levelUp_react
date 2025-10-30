import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCredenciales } from "../js/crudUsuarios"; 

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Login admin
        if (correo === "admin@duoc.cl" && pass === "admin") {
            alert("Bienvenido Administrador");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("usuarioLogeado", JSON.stringify({ nombre: "Administrador", correo, isAdmin: true }));
            localStorage.setItem("carrito_admin", JSON.stringify([])); // Inicializa carrito

            // Dispara actualización de Navbar
            window.dispatchEvent(new Event("storage"));

            navigate("/administrador");
            return;
        }

        // Login usuario normal
        const usuarioExistente = validarCredenciales(correo, pass);

        if (!usuarioExistente) {
            alert("Error: Correo o Contraseña incorrectos, o el usuario no está registrado.");
            return;
        }

        alert(`Inicio de sesión exitoso. Bienvenido(a), ${usuarioExistente.nombre}.`);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioExistente));

        // Inicializa carrito del usuario
        const claveCarrito = `carrito_${usuarioExistente.correo}`;
        if (!localStorage.getItem(claveCarrito)) {
            localStorage.setItem(claveCarrito, JSON.stringify([]));
        }
        window.dispatchEvent(new Event("storage"));

        navigate("/");
    };

    return (
        <div className="form-container">
            <h2 className="titulo text-center">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <button className="btn-ir" type="submit">Ingresar</button>
            </form>
        </div>
    );
}
