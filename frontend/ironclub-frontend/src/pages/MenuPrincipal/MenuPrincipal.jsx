function MenuPrincipal() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 rounded shadow-sm w-100">
            <a className="navbar-brand" href="/">
                IronClub
            </a>

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
                        <a className="nav-link" href="/">
                            Home
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/treinos">
                            Treinos
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/produtos">
                            Loja
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/perfil">
                            Perfil
                        </a>
                    </li>
                </ul>

                <button type="button" className="btn btn-primary">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default MenuPrincipal;