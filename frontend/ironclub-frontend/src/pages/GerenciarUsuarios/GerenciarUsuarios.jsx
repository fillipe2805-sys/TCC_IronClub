import styles from "../../styles/Layout.module.css";
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
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <PageInfo title="Gerenciar Usuários" descricao="Consulte os usuários cadastrados no IronClub." />

            <div className={`table-responsive ${styles.tabela}`}>
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
                                <td><span className={styles.tipo}>{usuario.tipoUsuario}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GerenciarUsuarios;