import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";

function NovoProduto() {

    const [produto, setProduto] = useState({
        nome: "",
        categoria: "",
        preco: "",
        estoque: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto({
            ...produto,
            [name]: value
        });
    };

    const enviarProduto = async (e) => {
        e.preventDefault();

        try {
            await api.post("/produtos", {
                ...produto,
                preco: Number(produto.preco),
                estoque: Number(produto.estoque)
            });

            alert("Produto cadastro com sucesso!");
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao cadastrar produto", error);
        }
    };

    return (
        <div className="container">
            <MenuPrincipal />

            <h1>Novo Produto</h1>
            <form className="container-fluid p-4" onSubmit={enviarProduto}>
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={produto.categoria}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Estoque:</label>
                    <input
                        type="number"
                        name="estoque"
                        value={produto.estoque}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Adicionar Produto
                </button>
            </form>
        </div>
    );
}

export default NovoProduto;