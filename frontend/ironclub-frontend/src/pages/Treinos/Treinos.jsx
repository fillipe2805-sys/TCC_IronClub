import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";

function Treinos() {
    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Treinos" />

            <p>Página de treinos do IronClub</p>
            
        </div>
    );
}

export default Treinos;