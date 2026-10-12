import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MenuPrincipal.module.css";

function MenuPrincipal() {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const ehAdmin = usuario?.tipoUsuario === "ADMIN";

    const links = [
        { nome: "Home", caminho: "/" },
        { nome: "Treinos", caminho: "/treinos" },
        { nome: "Loja", caminho: "/produtos" },
        { nome: "Carrinho", caminho: "/carrinho" },
        { nome: "Meus Pedidos", caminho: "/pedidos" },
        { nome: "Perfil", caminho: "/perfil" }
    ];

    if (ehAdmin) {
        links.push({
            nome: "Gerenciar Usuários",
            caminho: "/usuarios"
        });
    }

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <nav className={`navbar navbar-expand-xl navbar-dark ${styles.menu}`}>

            <NavLink className={`navbar-brand ${styles.marca}`} to="/">
                Iron<span>Club</span>
            </NavLink>

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
                    {links.map((link) => (
                        <li className="nav-item" key={link.caminho}>
                            <NavLink
                                to={link.caminho}
                                end={link.caminho === "/"}
                                className={({ isActive }) =>
                                    `nav-link ${styles.link} ${isActive ? styles.ativo : ""}`
                                }
                            >
                                {link.nome}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className={styles.logout}
                    onClick={logout}
                >
                    Sair da conta
                </button>

            </div>
        </nav>
    );
}

export default MenuPrincipal;