import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../components/PageInfo";
import api from "../../services/api";

function EditarProduto() {

    const [produto, setProduto] = useState({
        nome: "",
        categoria: "",
        preco: "",
        estoque: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/produtos/${id}`)
            .then((response) => {
                setProduto(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produto:", error);
            });
    }, { id });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto({
            ...produto,
            [name]: value
        });
    };

    const atualizarProduto = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/produtos/${id}`, {
                ...produto,
                preco: Number(produto.preco),
                estoque: Number(produto.estoque)
            });

            alert("Produto atualizado com sucesso!");
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    }

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Editar Produto" />

            <form className="container-fluid p-4" onSubmit={atualizarProduto}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        className="form-control"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <input
                        type="text"
                        name="categoria"
                        className="form-control"
                        value={produto.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        className="form-control"
                        value={produto.preco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Estoque</label>
                    <input
                        type="number"
                        name="estoque"
                        className="form-control"
                        value={produto.estoque}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}

export default EditarProduto;