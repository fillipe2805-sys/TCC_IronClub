import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

function NovoTreino() {

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    const [treino, setTreino] = useState({
        nome: "",
        grupoMuscular: ""
    });

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

        try {
            await api.post("/treinos", {
                idUsuario: usuarioLogado.idUsuario,
                nome: treino.nome,
                grupoMuscular: treino.grupoMuscular
            });

            alert("Treino criado com sucesso!");
            navigate("/treinos");
        } catch (error) {
            console.error("Erro ao criar treino:", error);
        }
    };

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Novo Treino" />

            <form className="mt-4" onSubmit={criarTreino}>
                <div className="mb-3">
                    <label className="form-label">Nome do treino</label>
                    <input
                        type="text"
                        name="nome"
                        className="form-control"
                        value={treino.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Grupo muscular</label>
                    <input
                        type="text"
                        name="grupoMuscular"
                        className="form-control"
                        value={treino.grupoMuscular}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Criar Treino
                </button>
            </form>
        </div>
    );
}

export default NovoTreino;