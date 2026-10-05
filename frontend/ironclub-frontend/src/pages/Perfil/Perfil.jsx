import PageInfo from "../components/PageInfo";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";

function Perfil() {
    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Perfil" />
            
            <p>Dados do usuário do IronClub.</p>
            
        </div>
    );
}

export default Perfil;