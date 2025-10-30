const CLAVE_USUARIOS = "usuarios"; 

/**
Obtiene la lista de usuarios registrados desde localStorage.
@returns {Array}
 */
export const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
};

/**
 * Valida las credenciales de un usuario.
 * @param {string} correo
 * @param {string} password
 * @returns {object | null}
 */
export const validarCredenciales = (correo, password) => {
    const usuarios = obtenerUsuarios();
    
    const usuarioEncontrado = usuarios.find(u => 
        u.correo === correo && u.password === password
    );
    
    return usuarioEncontrado || null;
};

/**
 * Crea y guarda un nuevo usuario en localStorage.
 * @param {object} nuevoUsuario
 * @returns {object}
 */
export const crearUsuario = (nuevoUsuario) => {
    let usuarios = obtenerUsuarios();
    
    if (usuarios.find(u => u.correo === nuevoUsuario.correo)) {
        return { success: false, message: "El correo ya está registrado." };
    }
    
    usuarios.push(nuevoUsuario);
    
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    
    return { success: true, message: "Usuario registrado exitosamente." };
};

/**
 * Elimina un usuario por su correo electrónico.
 * @param {string} correo
 * @returns {object}
 */
export const eliminarUsuario = (correo) => {
    let usuarios = obtenerUsuarios();
    
    const usuariosFiltrados = usuarios.filter(u => u.correo !== correo);
    
    if (usuarios.length === usuariosFiltrados.length) {
        return { success: false, message: "Usuario no encontrado." };
    }
    
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosFiltrados));
    return { success: true, message: "Usuario eliminado exitosamente." };
};