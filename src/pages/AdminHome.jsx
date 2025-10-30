// src/pages/AdminHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
    return (
        <div className="container p-5 text-center" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className="titulo" style={{ fontSize: '3rem', color: '#39ff14' }}>
                Bienvenido, Administrador
            </h1>
            <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '40px' }}>
                Utiliza los botones o el menú de navegación para gestionar la tienda.
            </p>

            <div className="d-flex justify-content-center">
                <Link to="/admin-productos" className="btn-ir btn-lg m-2" style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
                    Administrar Productos
                </Link>
                <Link to="/admin-usuarios" className="btn-ver btn-lg m-2" style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
                    Administrar Usuarios
                </Link>
            </div>
        </div>
    );
}