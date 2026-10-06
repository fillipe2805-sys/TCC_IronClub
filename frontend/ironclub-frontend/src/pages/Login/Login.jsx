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
        <div className="container mt-4">
            <h1>Login</h1>

            <form className="mt-4" onSubmit={realizarLogin}>
                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={login.email}
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
                        value={login.senha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;