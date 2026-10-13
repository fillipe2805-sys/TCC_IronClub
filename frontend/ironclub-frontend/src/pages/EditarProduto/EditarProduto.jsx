import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../../components/PageInfo";
import api from "../../services/api";

function EditarProduto() {

    const [produto, setProduto] = useState({
        nome: "",
        categoria: "",
        preco: "",
        estoque: "",
        imagemUrl: ""
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
    }, [id]);

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
                estoque: Number(produto.estoque),
                imagemUrl: (produto.imagemUrl || "").trim() || null
            });

            alert("Produto atualizado com sucesso!");
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    }

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <PageInfo title="Editar Produto" descricao="Atualize as informações do suplemento." />

            <form className={styles.formulario} onSubmit={atualizarProduto}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="editarproduto-nome">Nome</label>
                    <input
                        type="text"
                        id="editarproduto-nome"
                        name="nome"
                        className="form-control"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="editarproduto-categoria">Categoria</label>
                    <input
                        type="text"
                        id="editarproduto-categoria"
                        name="categoria"
                        className="form-control"
                        value={produto.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="editarproduto-preco">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        id="editarproduto-preco"
                        name="preco"
                        className="form-control"
                        value={produto.preco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="editarproduto-estoque">Estoque</label>
                    <input
                        type="number"
                        id="editarproduto-estoque"
                        name="estoque"
                        className="form-control"
                        value={produto.estoque}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="editarproduto-imagem">URL da imagem (opcional)</label>
                    <input
                        type="url"
                        id="editarproduto-imagem"
                        name="imagemUrl"
                        value={produto.imagemUrl || ""}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="https://exemplo.com/produto.jpg"
                        maxLength={2048}
                    />
                    <p className="form-text mb-0">Use o endereço direto de uma foto do produto. Apague a URL para voltar à foto ilustrativa.</p>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}

export default EditarProduto;