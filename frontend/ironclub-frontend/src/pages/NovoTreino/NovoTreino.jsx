import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

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
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Novo Treino" />
            <Link className="btn btn-outline-secondary" to="/treinos">Voltar para Treinos</Link>
            <p className="mt-3">Depois de criar o treino, adicione pelo menos um exercício para completá-lo.</p>
            {erro && <div className="alert alert-danger mt-3" role="alert">{erro}</div>}

            <form className="mt-4" onSubmit={criarTreino}>
                <fieldset disabled={salvando}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="nomeTreino">Nome do treino</label>
                        <input
                            id="nomeTreino"
                            type="text"
                            name="nome"
                            className="form-control"
                            value={treino.nome}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="grupoTreino">Grupo muscular</label>
                        <input
                            id="grupoTreino"
                            type="text"
                            name="grupoMuscular"
                            className="form-control"
                            value={treino.grupoMuscular}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        {salvando ? "Criando..." : "Criar Treino"}
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default NovoTreino;
