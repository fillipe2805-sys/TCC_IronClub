import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Cadastro() {

    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    const CadastrarUsuario = async (e) => {
        e.preventDefault();

        try {
            await api.post("/usuarios", {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                tipoUsuario: "ALUNO"
            });

            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Cadastro</h1>

            <form className="mt-4" onSubmit={CadastrarUsuario}>
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
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        className="form-control"
                        value={usuario.senha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default Cadastro;