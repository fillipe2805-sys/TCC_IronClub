import { useEffect, useState } from "react";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../../components/PageInfo";
import api from "../../services/api";

function GerenciarUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        api.get("/usuarios")
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Gerenciar Usuários" />

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Tipo de usuário</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.idUsuario}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tipoUsuario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GerenciarUsuarios;