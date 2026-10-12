import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import styles from "./Home.module.css";

function Home() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const ehAdmin = usuario?.tipoUsuario === "ADMIN";

    const acessos = [
        {
            numero: "01",
            titulo: "Treinos",
            descricao: "Acesse seus treinos e visualize seus exercícios.",
            caminho: "/treinos",
            botao: "Ver Treinos"
        },
        {
            numero: "02",
            titulo: "Loja",
            descricao: "Confira os suplementos disponíveis na academia.",
            caminho: "/produtos",
            botao: "Explorar Loja"
        },
        {
            numero: "03",
            titulo: "Carrinho",
            descricao: "Revise seus produtos e finalize sua compra.",
            caminho: "/carrinho",
            botao: "Ver Carrinho"
        },
        {
            numero: "04",
            titulo: "Meus Pedidos",
            descricao: "Consulte o histórico das suas compras.",
            caminho: "/pedidos",
            botao: "Ver Pedidos"
        },
        {
            numero: "05",
            titulo: "Perfil",
            descricao: "Visualize e atualize seus dados pessoais.",
            caminho: "/perfil",
            botao: "Ver Perfil"
        }
    ];

    if (ehAdmin) {
        acessos.push({
            numero: "06",
            titulo: "Gerenciar Usuários",
            descricao: "Consulte os usuários cadastrados no sistema.",
            caminho: "/usuarios",
            botao: "Ver Usuários"
        });
    }

    return (
        <div className={`container ${styles["pagina-home"]}`}>
            <MenuPrincipal />

            <main>
                <section className={styles["home-banner"]}>
                    <div className={styles["home-banner-conteudo"]}>
                        <span className={styles["home-destaque"]}>
                            IRONCLUB
                        </span>

                        <h1>Seu espaço IronClub</h1>

                        <p>
                            Organize seus treinos, encontre suplementos
                            e acompanhe seus pedidos em um só lugar.
                        </p>

                        <div className={styles["home-linha"]}></div>
                    </div>

                    <div className={styles["home-frase"]}>
                        Disciplina hoje.<br />Resultados sempre.
                    </div>
                </section>

                <section className={styles["home-acessos"]}>
                    <div className={styles["home-titulo-secao"]}>
                        <h2>Acesso rápido</h2>

                        <p>
                            Navegue pelas principais funcionalidades do sistema.
                        </p>
                    </div>

                    <div className={styles["home-grid"]}>
                        {acessos.map((acesso) => (
                            <div
                                className={styles["home-card"]}
                                key={acesso.numero}
                            >
                                <div className={styles["home-card-numero"]}>
                                    {acesso.numero}
                                </div>

                                <h3>{acesso.titulo}</h3>

                                <p>{acesso.descricao}</p>

                                <Link
                                    className={styles["home-card-botao"]}
                                    to={acesso.caminho}
                                >
                                    {acesso.botao}
                                    <span>→</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {ehAdmin && (
                    <section className={styles["home-administracao"]}>
                        <div className={styles["home-admin-simbolo"]}>
                            A
                        </div>

                        <div>
                            <h3>Área administrativa</h3>

                            <p>
                                Gerencie os usuários cadastrados e os
                                produtos disponibilizados na academia.
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Home;
