import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";
import styles from "./NovoTreino.module.css";

function NovoTreino() {

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    const [treino, setTreino] = useState({
        nome: "",
        grupoMuscular: ""
    });

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTreino({
            ...treino,
            [name]: value
        });
    };

    const criarTreino = async (e) => {
        e.preventDefault();

        if (salvando) return;

        const nome = treino.nome.trim();
        const grupoMuscular = treino.grupoMuscular.trim();

        if (!nome || !grupoMuscular) {
            setErro("Informe o nome e o grupo muscular do treino.");
            return;
        }

        setErro("");
        setSalvando(true);

        try {
            const response = await api.post("/treinos", {
                idUsuario: usuarioLogado.idUsuario,
                nome,
                grupoMuscular
            });

            navigate(`/treinos/${response.data.idTreino}`);
        } catch {
            setErro("Não foi possível criar o treino. Tente novamente.");
        }

        setSalvando(false);
    };

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <main>
                <section className={styles.cabecalho}>
                    <span className={styles.destaque}>IRONCLUB</span>

                    <h1>Novo Treino</h1>

                    <p>
                        Organize sua rotina de exercícios criando um novo treino.
                    </p>
                </section>

                <section className={styles.conteudo}>
                    <div className={styles.formulario}>
                        <div className={styles.topoFormulario}>
                            <Link
                                className={styles.voltar}
                                to="/treinos"
                            >
                                ← Voltar para Treinos
                            </Link>

                            <h2>Informações do treino</h2>

                            <p>
                                Preencha os campos abaixo para começar.
                            </p>
                        </div>

                        {erro && (
                            <div className="alert alert-danger" role="alert">
                                {erro}
                            </div>
                        )}

                        <form onSubmit={criarTreino}>
                            <fieldset disabled={salvando}>
                                <div className={styles.campo}>
                                    <label htmlFor="nomeTreino">
                                        Nome do treino
                                    </label>

                                    <input
                                        id="nomeTreino"
                                        type="text"
                                        name="nome"
                                        placeholder="Ex.: Treino A"
                                        value={treino.nome}
                                        onChange={handleChange}
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div className={styles.campo}>
                                    <label htmlFor="grupoTreino">
                                        Grupo muscular
                                    </label>

                                    <input
                                        id="grupoTreino"
                                        type="text"
                                        name="grupoMuscular"
                                        placeholder="Ex.: Peito e tríceps"
                                        value={treino.grupoMuscular}
                                        onChange={handleChange}
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div className={styles.aviso}>
                                    Depois de criar o treino, você poderá
                                    adicionar seus exercícios, séries e repetições.
                                </div>

                                <button
                                    type="submit"
                                    className={styles.botaoSalvar}
                                >
                                    {salvando ? "Criando..." : "Criar Treino"}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default NovoTreino;