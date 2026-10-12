import styles from "../../styles/Layout.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";
import PageInfo from "../../components/PageInfo";

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
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <PageInfo title="Novo Produto" descricao="Cadastre os dados do suplemento e o estoque disponível." />

            <form className={styles.formulario} onSubmit={enviarProduto}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="novoproduto-nome">Nome</label>
                    <input
                        type="text"
                        id="novoproduto-nome"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="novoproduto-categoria">Categoria</label>
                    <input
                        type="text"
                        id="novoproduto-categoria"
                        name="categoria"
                        value={produto.categoria}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="novoproduto-preco">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        id="novoproduto-preco"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="novoproduto-estoque">Estoque</label>
                    <input
                        type="number"
                        id="novoproduto-estoque"
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