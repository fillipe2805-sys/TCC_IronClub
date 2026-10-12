import styles from "../../styles/Auth.module.css";
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
        <main className={styles.pagina}>
            <Link className={styles.marca} to="/">Iron<span>Club</span></Link>
            <div className={styles.painel}>
                <div className={styles.apresentacao}>
                    <span>SUA ACADEMIA, SEU ESPAÇO</span>
                    <h2>Disciplina hoje.<br />Resultados sempre.</h2>
                    <p>Organize seus treinos, encontre suplementos e acompanhe seus pedidos em um só lugar.</p>
                </div>
                <div className={styles.formulario}>
                    <h1>Cadastro</h1>
                    <p>Crie sua conta e comece a organizar seus treinos.</p>
                    <form onSubmit={CadastrarUsuario}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="cadastro-nome">Nome</label>
                            <input
                                type="text"
                                id="cadastro-nome"
                                name="nome"
                                className="form-control"
                                value={usuario.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="cadastro-email">E-mail</label>
                            <input
                                type="email"
                                id="cadastro-email"
                                name="email"
                                className="form-control"
                                value={usuario.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="cadastro-senha">Senha</label>
                            <input
                                type="password"
                                id="cadastro-senha"
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
                    <p className={styles.rodape}>Já tem uma conta? <Link to="/login">Entrar</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;