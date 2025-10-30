import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    
    // Estado para controlar si ya terminamos de leer localStorage
    const [cargando, setCargando] = useState(true);
    // Estado para almacenar el resultado de la verificación de permisos
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        const verificarAdmin = () => {
            const usuarioString = localStorage.getItem("usuarioLogeado");
            let usuario = null;

            if (usuarioString) {
                try {
                    usuario = JSON.parse(usuarioString);
                } catch (error) {
                    console.error("Error al parsear usuario de localStorage:", error);
                }
            }
            
            const isAdmin = usuario && usuario.isAdmin === true;
            
            setEsAdmin(isAdmin);
            setCargando(false);
        };

        verificarAdmin();
    }, []); 

    if (cargando) {
        return <div className="container text-center mt-5">Verificando permisos...</div>;
    }

    if (esAdmin) {
        return <Outlet />;
    } else {
        alert(" Acceso denegado: solo administradores pueden ingresar.");
        return <Navigate to="/" />; 
    }
}