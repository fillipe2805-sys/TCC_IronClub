import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

function Treinos() {

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    const [treinos, setTreinos] = useState([]);

    useEffect(() => {
        api.get(`/treinos/usuario/${usuarioLogado.idUsuario}`)
            .then((response) => {
                setTreinos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar treinos:", error);
            });
    }, []);

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Treinos" />

            <Link className="btn btn-primary mb-3" to="/treinos/novo">
                Novo Treino
            </Link>

            {treinos.length > 0 ? (
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