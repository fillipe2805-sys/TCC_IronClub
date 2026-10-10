import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

const exercicioInicial = { idExercicio: "", series: "", repeticoes: "", descanso: "" };

function DetalhesTreino() {
    const { id } = useParams();
    const { idUsuario } = JSON.parse(localStorage.getItem("usuario"));
    const [treino, setTreino] = useState(null);
    const [exercicios, setExercicios] = useState([]);
    const [vinculos, setVinculos] = useState([]);
    const [novoExercicio, setNovoExercicio] = useState(exercicioInicial);
    const [editando, setEditando] = useState(false);
    const [camposTreino, setCamposTreino] = useState({ nome: "", grupoMuscular: "" });
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function carregarTreino() {
            try {
                const response = await api.get(`/treinos/usuario/${idUsuario}`);
                const treinoEncontrado = response.data.filter((item) => item.idTreino === Number(id))[0];
                if (!treinoEncontrado) {
                    setTreino(null);
                    setMensagem("Treino inexistente ou não pertencente ao seu usuário.");
                    return;
                }

                // Busca os exercícios somente depois de validar o treino do usuário.
                const responseExercicios = await api.get("/exercicios");
                const responseVinculos = await api.get(`/treino-exercicios/treino/${id}`);
                setExercicios(responseExercicios.data);
                setVinculos(responseVinculos.data);
                setTreino(treinoEncontrado);
                setMensagem("");
                setEditando(false);
                setNovoExercicio(exercicioInicial);
            } catch {
                setTreino(null);
                setMensagem("Não foi possível carregar o treino e seus exercícios. Tente novamente.");
            }
        }
        carregarTreino();
    }, [id, idUsuario]);

    const handleChangeTreino = (e) => {
        const { name, value } = e.target;
        setCamposTreino({ ...camposTreino, [name]: value });
    };

    const handleChangeExercicio = (e) => {
        const { name, value } = e.target;
        setNovoExercicio({ ...novoExercicio, [name]: value });
    };

    const editarTreino = () => {
        setCamposTreino({ nome: treino.nome, grupoMuscular: treino.grupoMuscular });
        setMensagem("");
        setEditando(true);
    };

    async function salvarTreino(event) {
        event.preventDefault();
        if (salvando) return;
        const nome = camposTreino.nome.trim();
        const grupoMuscular = camposTreino.grupoMuscular.trim();
        if (!nome || !grupoMuscular) {
            setMensagem("Informe o nome e o grupo muscular do treino.");
            return;
        }

        setSalvando(true);
        setMensagem("");
        try {
            const response = await api.put(`/treinos/${id}`, { nome, grupoMuscular });
            setTreino(response.data);
            setEditando(false);
            alert("Treino atualizado com sucesso!");
        } catch {
            setMensagem("Não foi possível editar o treino. Tente novamente.");
        }
        setSalvando(false);
    }

    async function adicionarExercicio(event) {
        event.preventDefault();
        if (salvando) return;
        setSalvando(true);
        setMensagem("");
        try {
            const response = await api.post("/treino-exercicios", {
                idTreino: treino.idTreino,
                idExercicio: Number(novoExercicio.idExercicio),
                series: Number(novoExercicio.series),
                repeticoes: Number(novoExercicio.repeticoes),
                descanso: novoExercicio.descanso === "" ? null : Number(novoExercicio.descanso)
            });
            setVinculos([...vinculos, response.data]);
            setNovoExercicio(exercicioInicial);
            alert("Exercício adicionado com sucesso!");
        } catch {
            setMensagem("Não foi possível adicionar o exercício. Tente novamente.");
        }
        setSalvando(false);
    }

    return (
        <div className="container pb-4">
            <MenuPrincipal />
            <PageInfo title="Detalhes do Treino" />
            <Link className="btn btn-outline-secondary mb-3" to="/treinos">Voltar para Treinos</Link>
            {mensagem && (
                <div className="alert alert-danger">
                    {mensagem}
                </div>
            )}
            {!mensagem && !treino && <p>Carregando treino...</p>}
            {treino && treino.idTreino === Number(id) && (
                <div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title text-break">{treino.nome}</h3>
                            <p className="text-break"><strong>Grupo muscular:</strong> {treino.grupoMuscular}</p>
                            {!editando ? (
                                <button className="btn btn-outline-primary" type="button" onClick={editarTreino}>Editar Treino</button>
                            ) : (
                                <form className="mt-3" onSubmit={salvarTreino}>
                                    <fieldset disabled={salvando}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="editarNome">Nome do treino</label>
                                            <input id="editarNome" name="nome" className="form-control" value={camposTreino.nome} maxLength={100} required
                                                onChange={handleChangeTreino} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="editarGrupo">Grupo muscular</label>
                                            <input id="editarGrupo" name="grupoMuscular" className="form-control" value={camposTreino.grupoMuscular} maxLength={100} required
                                                onChange={handleChangeTreino} />
                                        </div>
                                        <button className="btn btn-primary me-2" type="submit">{salvando ? "Salvando..." : "Salvar Alterações"}</button>
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => setEditando(false)}>Cancelar</button>
                                    </fieldset>
                                </form>
                            )}
                        </div>
                    </div>

                    <h3>Exercícios do treino</h3>
                    {vinculos.length === 0 && <div className="alert alert-warning">Este treino ainda não possui exercícios. Adicione pelo menos um exercício com séries e repetições para completá-lo.</div>}
                    <div className="row g-3 mb-4">
                        {vinculos.map((vinculo) => {
                            const exercicio = exercicios.filter((item) => item.idExercicio === vinculo.idExercicio)[0];
                            return (
                                <div className="col-12 col-md-6" key={vinculo.idTreinoExercicio}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 className="h5 text-break">{exercicio?.nome || `Exercício #${vinculo.idExercicio}`}</h4>
                                            {exercicio?.grupoMuscular && <p><strong>Grupo muscular:</strong> {exercicio.grupoMuscular}</p>}
                                            <p><strong>Séries:</strong> {vinculo.series}</p>
                                            <p><strong>Repetições:</strong> {vinculo.repeticoes}</p>
                                            <p><strong>Descanso:</strong> {vinculo.descanso == null ? "Não informado" : `${vinculo.descanso} segundos`}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3>Adicionar exercício</h3>
                            {exercicios.length === 0 && <p>Nenhum exercício disponível no momento. Tente novamente quando houver exercícios cadastrados.</p>}
                            <form onSubmit={adicionarExercicio}>
                                <fieldset disabled={salvando || exercicios.length === 0}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exercicio">Exercício</label>
                                        <select id="exercicio" name="idExercicio" className="form-select" value={novoExercicio.idExercicio} required onChange={handleChangeExercicio}>
                                            <option value="">Selecione um exercício</option>
                                            {exercicios.map((item) => <option key={item.idExercicio} value={item.idExercicio}>{item.nome} ({item.grupoMuscular})</option>)}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-4 mb-3">
                                            <label className="form-label" htmlFor="series">Séries</label>
                                            <input id="series" name="series" className="form-control" type="number" min="1" step="1" required value={novoExercicio.series}
                                                onChange={handleChangeExercicio} />
                                        </div>
                                        <div className="col-12 col-sm-4 mb-3">
                                            <label className="form-label" htmlFor="repeticoes">Repetições</label>
                                            <input id="repeticoes" name="repeticoes" className="form-control" type="number" min="1" step="1" required value={novoExercicio.repeticoes}
                                                onChange={handleChangeExercicio} />
                                        </div>
                                        <div className="col-12 col-sm-4 mb-3">
                                            <label className="form-label" htmlFor="descanso">Descanso (segundos, opcional)</label>
                                            <input id="descanso" name="descanso" className="form-control" type="number" min="0" step="1" value={novoExercicio.descanso}
                                                onChange={handleChangeExercicio} />
                                            <div className="form-text">Deixe em branco se não informado.</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" type="submit">{salvando ? "Salvando..." : "Salvar Exercício"}</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetalhesTreino;
