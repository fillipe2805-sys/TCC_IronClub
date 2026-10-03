import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";

function Perfil() {
    return (
        <div className="container">
            <MenuPrincipal />

            <div>
                <h1>Perfil</h1>
                <p>Dados do usuário do IronClub.</p>
            </div>
        </div>
    );
}

export default Perfil;