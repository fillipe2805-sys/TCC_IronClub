import { useEffect, useState } from "react";
import PageInfo from "../components/PageInfo";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";

function Perfil() {

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        api.get(`/usuarios/${usuarioLogado.idUsuario}`)
            .then((response) => {
                setUsuario(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar perfil:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    const atualizarPerfil = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(
                `/usuarios/${usuarioLogado.idUsuario}`,
                {
                    nome: usuario.nome,
                    email: usuario.email,
                    objetivoFisico: usuario.objetivoFisico
                }
            );

            setUsuario(response.data);

            localStorage.setItem(
                "usuario",
                JSON.stringify(response.data)
            );

            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Perfil" />

            {usuario ? (
                <form className="mt-4" onSubmit={atualizarPerfil}>

                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            className="form-control"
                            value={usuario.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={usuario.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Objetivo físico</label>
                        <input
                            type="text"
                            name="objetivoFisico"
                            className="form-control"
                            value={usuario.objetivoFisico || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tipo de usuário</label>
                        <input
                            type="text"
                            className="form-control"
                            value={usuario.tipoUsuario}
                            disabled
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Salvar Alterações
                    </button>

                </form>
            ) : (
                <p>Carregando perfil...</p>
            )}

        </div>
    );
}

export default Perfil;