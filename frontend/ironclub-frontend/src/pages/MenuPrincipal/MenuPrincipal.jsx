import { Link, useNavigate } from "react-router-dom";

function MenuPrincipal() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 rounded shadow-sm w-100">
            <Link className="navbar-brand" to="/">
                IronClub
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menuPrincipal"
                aria-controls="menuPrincipal"
                aria-expanded="false"
                aria-label="Abrir menu"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menuPrincipal">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/treinos">
                            Treinos
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/produtos">
                            Loja
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/perfil">
                            Perfil
                        </Link>
                    </li>
                </ul>

                <button type="button" className="btn btn-primary" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default MenuPrincipal;