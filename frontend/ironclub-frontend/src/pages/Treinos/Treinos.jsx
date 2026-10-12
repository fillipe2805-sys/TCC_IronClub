import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";
import styles from "./Treinos.module.css";

function Treinos() {

    const { idUsuario } = JSON.parse(localStorage.getItem("usuario"));

    const [treinos, setTreinos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        api.get(`/treinos/usuario/${idUsuario}`)
            .then((response) => {
                setTreinos(response.data);
                setCarregando(false);
            })
            .catch(() => {
                setErro("Não foi possível carregar seus treinos. Tente atualizar a página.");
                setCarregando(false);
            });
    }, [idUsuario]);

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <main>
                <section className={styles.cabecalho}>
                    <div>
                        <span className={styles.destaque}>IRONCLUB</span>

                        <h1>Meus Treinos</h1>

                        <p>
                            Organize seus treinos e consulte seus exercícios
                            sempre que precisar.
                        </p>
                    </div>

                    <Link className={styles.botaoNovo} to="/treinos/novo">
                        + Novo Treino
                    </Link>
                </section>

                <section className={styles.conteudo}>
                    <div className={styles.tituloSecao}>
                        <h2>Treinos cadastrados</h2>
                        <p>Selecione um treino para visualizar seus detalhes.</p>
                    </div>

                    {carregando ? (
                        <p>Carregando treinos...</p>
                    ) : erro ? (
                        <div className="alert alert-danger">
                            {erro}
                        </div>
                    ) : treinos.length > 0 ? (
                        <div className={styles.grid}>
                            {treinos.map((treino) => (
                                <div
                                    className={styles.card}
                                    key={treino.idTreino}
                                >
                                    <div className={styles.icone}>
                                        T
                                    </div>

                                    <h3>{treino.nome}</h3>

                                    <p className={styles.grupoValor}>
                                        <span>Grupo muscular: </span>
                                        {treino.grupoMuscular}
                                    </p>

                                    <Link
                                        className={styles.botaoVer}
                                        to={`/treinos/${treino.idTreino}`}
                                    >
                                        Ver Treino
                                        <span>→</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.vazio}>
                            <h3>Nenhum treino cadastrado</h3>

                            <p>
                                Comece criando seu primeiro treino.
                            </p>

                            <Link className={styles.botaoNovo} to="/treinos/novo">
                                Criar Treino
                            </Link>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Treinos;
