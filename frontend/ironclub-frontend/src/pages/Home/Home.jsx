import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";

function Home() {
    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Home" />

            <p>Bem-vindo ao sistema da academia.</p>
        
        </div>
    );
}

export default Home;