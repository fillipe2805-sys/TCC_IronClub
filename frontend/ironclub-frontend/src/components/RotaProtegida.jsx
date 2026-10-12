import { Navigate } from "react-router-dom";

function RotaProtegida({ children, tipoPermitido }) {

    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
        return <Navigate to="/login" replace />;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (tipoPermitido && usuario.tipoUsuario !== tipoPermitido) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RotaProtegida;