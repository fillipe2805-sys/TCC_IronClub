import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

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
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Treinos" />

            <Link className="btn btn-primary mb-3" to="/treinos/novo">
                Novo Treino
            </Link>

            {carregando ? (
                <p role="status">Carregando treinos...</p>
            ) : erro ? (
                <div className="alert alert-danger" role="alert">{erro}</div>
            ) : treinos.length > 0 ? (
                <div className="mt-4">
                    {treinos.map((treino) => (
                        <div
                            className="card mb-3"
                            key={treino.idTreino}
                        >
                            <div className="card-body">
                                <h5 className="card-title">
                                    {treino.nome}
                                </h5>

                                <p className="card-text">
                                    <strong>Grupo muscular:</strong>{" "}
                                    {treino.grupoMuscular}
                                </p>
                                <Link className="btn btn-outline-primary" to={`/treinos/${treino.idTreino}`}>
                                    Ver Treino
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4">
                    Nenhum treino cadastrado.
                </p>
            )}

        </div>
    );
}

export default Treinos;
