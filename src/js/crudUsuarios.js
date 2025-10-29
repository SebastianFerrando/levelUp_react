// src/js/crudUsuarios.js

// Clave donde se guardan todos los usuarios registrados
const CLAVE_USUARIOS = "usuariosRegistrados"; 

// Lee todos los usuarios registrados
export const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
};

// Guarda un nuevo usuario
export const crearUsuario = (usuario) => {
    const usuarios = obtenerUsuarios();
    
    // Verificar si el correo ya existe
    if (usuarios.find(u => u.correo === usuario.correo)) {
        return false; // Retorna false si el usuario ya está registrado
    }
    
    usuarios.push(usuario);
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    return true; // Retorna true si el registro fue exitoso
};

// Verifica las credenciales de un usuario para iniciar sesión
export const validarCredenciales = (correo, pass) => {
    const usuarios = obtenerUsuarios();
    
    // Buscar un usuario que coincida con correo Y contraseña
    const usuarioEncontrado = usuarios.find(
        u => u.correo === correo && u.pass === pass
    );
    
    // Retorna el objeto del usuario si existe, o null si no
    return usuarioEncontrado || null;
};