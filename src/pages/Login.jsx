// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Importar la función de validación
import { validarCredenciales } from "../js/crudUsuarios"; 

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    // NOTA: La validación de formato (validarCorreo) ya no es crítica aquí, 
    // pues la validación del correo se hace al REGISTRAR. 
    // La dejaremos solo para propósitos de UX o si es requisito.

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Lógica de Administrador (siempre tiene prioridad)
        if (correo === "admin@duoc.cl" && pass === "admin") {
            alert("✅ Bienvenido Administrador");
            localStorage.setItem(
                "usuarioLogeado",
                JSON.stringify({ nombre: "Administrador", correo, isAdmin: true })
            );
            navigate("/administrador");
            return;
        }

        // 2. Lógica de Usuario Registrado: Usar la nueva función
        const usuarioExistente = validarCredenciales(correo, pass);

        if (!usuarioExistente) {
            alert("❌ Error: Correo o Contraseña incorrectos, o el usuario no está registrado.");
            return;
        }

        // Si llegamos aquí, el usuario y la contraseña son correctos.
        alert(`✅ Inicio de sesión exitoso. Bienvenido(a), ${usuarioExistente.nombre}.`);

        // 3. Guarda los datos del usuario común encontrado (incluye nombre, correo, etc.)
        // Se añade isAdmin: false explícitamente.
        localStorage.setItem("usuarioLogeado", JSON.stringify({
            ...usuarioExistente,
            isAdmin: false 
        }));

        navigate("/");
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