import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCredenciales } from "../js/crudUsuarios";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (correo === "admin@duoc.cl" && pass === "admin") {
            alert("Bienvenido Administrador");
            localStorage.setItem(
                "usuarioLogeado",
                JSON.stringify({ nombre: "Administrador", correo, isAdmin: true })
            );
            localStorage.setItem("isLoggedIn", "true");
            navigate("/administrador");
            return;
        }

        const usuario = validarCredenciales(correo, pass);

        if (usuario) {
            alert(`Bienvenido ${usuario.nombre}`);

            localStorage.setItem(
                "usuarioLogeado",
                JSON.stringify({
                    ...usuario,
                    isAdmin: false
                })
            );
            localStorage.setItem("isLoggedIn", "true");

            navigate("/productos");
            return;
        } else {
            alert("Error: Correo o contraseña incorrectos.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="titulo text-center">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>Correo</label>
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <label>Contraseña</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button className="btn-ir" type="submit">Ingresar</button>
            </form>
        </div>
    );
}