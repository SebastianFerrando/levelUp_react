// src/pages/Contacto.jsx
import { useState } from "react";
// Importar solo las validaciones necesarias
import { validarDominioCorreo, validarLongitud } from "../js/validaciones"; 

export default function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDACIONES
        if (!validarLongitud(nombre, 100, 1)) {
            alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
            return;
        }

        if (!validarDominioCorreo(correo)) {
            alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (!validarLongitud(mensaje, 500, 1)) {
            alert("El mensaje es obligatorio y debe tener máximo 500 caracteres.");
            return;
        }

        // Si todas las validaciones pasan
        alert("✅ Mensaje enviado correctamente.");
        
        // Limpiar formulario (resetear los estados)
        setNombre("");
        setCorreo("");
        setMensaje("");
    };

    return (
        <div className="form-container">
            <h2 className="titulo text-center">Contacto</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <label>Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <label>Mensaje</label>
                <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows="5"
                    required
                />
                <button className="btn-ir mt-3" type="submit">Enviar Mensaje</button>
            </form>
        </div>
    );
}