import styles from "../../styles/Auth.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {

    const [login, setLogin] = useState({
        email: "",
        senha: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value
        });
    };

    const realizarLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/usuarios/login", login);

            if (response.data) {
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(response.data)
                );

                navigate("/");
            } else {
                alert("E-mail ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            alert("Não foi possível realizar o login.");
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
                    <h1>Login</h1>
                    <p>Acesse sua conta para continuar.</p>
                    <form onSubmit={realizarLogin}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="login-email">E-mail</label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                className="form-control"
                                value={login.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="login-senha">Senha</label>
                            <input
                                type="password"
                                id="login-senha"
                                name="senha"
                                className="form-control"
                                value={login.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Entrar
                        </button>
                    </form>
                    <p className={styles.rodape}>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Login;