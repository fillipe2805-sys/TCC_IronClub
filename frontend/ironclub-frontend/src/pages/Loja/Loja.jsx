import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";

function Loja() {
    return (
        <div className="container">
            <MenuPrincipal />

            <div>
                <h1>Loja</h1>
                <p>Produtos disponíveis no IronClub</p>
            </div>
        </div>
    );
}

export default Loja;