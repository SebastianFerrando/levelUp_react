import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuario } from "../js/crudUsuarios"; 
import { 
    validarDominioCorreo, 
    validarPass, 
    validarTelefono, 
    validarLongitud, 
    comunasPorRegion 
} from "../js/validaciones"; 

export default function Registro() {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [confirmCorreo, setConfirmCorreo] = useState("");
    const [password, setPassword] = useState(""); // <- cambiado de 'pass'
    const [confirmPass, setConfirmPass] = useState("");
    const [telefono, setTelefono] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    
    const comunasDisponibles = useMemo(() => {
        return comunasPorRegion[region] || [];
    }, [region]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarLongitud(nombre, 100, 1)) {
            alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
            return;
        }

        if (!validarDominioCorreo(correo)) {
            alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (correo !== confirmCorreo) {
            alert("Los correos no coinciden.");
            return;
        }

        if (!validarPass(password)) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        if (password !== confirmPass) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!validarTelefono(telefono)) {
            alert("El teléfono debe contener solo números y entre 8 a 12 dígitos.");
            return;
        }
        
        if (!region || !comuna) {
            alert("Debe seleccionar una región y una comuna.");
            return;
        }

        const nuevoUsuario = {
            nombre,
            correo,
            password, // <- ahora coincide con login
            telefono,
            region,
            comuna
        };
        
        const resultado = crearUsuario(nuevoUsuario); // <- aseguramos usar el retorno
        if (resultado.success) {
            alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
            navigate("/login");
        } else {
            alert("Error: " + resultado.message);
        }
    };
    
    return (
        <div className="form-container">
            <h2 className="titulo text-center">Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                
                <label>Correo</label>
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                <label>Confirmar Correo</label>
                <input type="email" value={confirmCorreo} onChange={(e) => setConfirmCorreo(e.target.value)} required />

                <label>Contraseña (4-10 caracteres)</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>Confirmar Contraseña</label>
                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />

                <label>Teléfono (Opcional)</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                
                <label htmlFor="region">Región</label>
                <select id="region" className="form-control" value={region} onChange={(e) => {setRegion(e.target.value); setComuna("");}} required>
                    <option value="">--Seleccione una Región</option>
                    {Object.keys(comunasPorRegion).map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <label htmlFor="comuna">Comuna</label>
                <select id="comuna" className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} required disabled={!region}>
                    <option value="">--Seleccione una Comuna</option>
                    {comunasDisponibles.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                
                <button type="submit" className="btn-ir mt-3">Registrarse</button>
            </form>
        </div>
    );
}
