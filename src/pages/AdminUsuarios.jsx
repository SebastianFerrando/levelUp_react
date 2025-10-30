import React, { useState, useEffect } from "react";
import {
    obtenerUsuarios,
    eliminarUsuario
} from "../js/crudUsuarios";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        recargarUsuarios();
    }, []);

    const recargarUsuarios = () => {
        setUsuarios(obtenerUsuarios());
    };

    const handleEliminarUsuario = (correo, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario "${nombre}" (${correo})?`)) {

            const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
            if (usuarioLogeado && usuarioLogeado.correo === correo) {
                alert("❌ No puedes eliminar la cuenta de administrador activa.");
                return;
            }

            const resultado = eliminarUsuario(correo);
            if (resultado.success) {
                alert(resultado.message);
                recargarUsuarios();
            } else {
                alert("Error: " + resultado.message);
            }
        }
    };

    return (
        <div className="container p-4" style={{ padding: '30px 20px' }}>
            <h1 className="titulo text-center">Administración de Usuarios</h1>

            <h2 className="sub-titulo text-center" style={{ color: '#00ffff', marginTop: '20px' }}>
                Usuarios Registrados ({usuarios.length})
            </h2>

            <div className="table-responsive">
                <table className="table table-dark table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(u => (
                            <tr key={u.correo}>
                                <td>{u.nombre}</td>
                                <td>{u.correo}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarUsuario(u.correo, u.nombre)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {usuarios.length === 0 && (
                <p className="text-center mt-3" style={{ color: '#aaa' }}>No hay usuarios registrados.</p>
            )}
        </div>
    );
}
