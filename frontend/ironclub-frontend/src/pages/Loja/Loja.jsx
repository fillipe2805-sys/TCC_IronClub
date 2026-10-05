import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";
import PageInfo from "../components/PageInfo";
import Modal from "../components/Modal";

function Loja() {

    const [produtos, setProdutos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idProdutoAExcluir, setIdProdutoAExcluir] = useState(null);

    const openModal = (idProduto) => {
        setIdProdutoAExcluir(idProduto);
        setIsModalOpen(true);
    }

    const deleteProduto = async () => {
        try {
            await api.delete(`/produtos/${idProdutoAExcluir}`);

            setProdutos(
                produtos.filter(
                    (produto) => produto.idProduto !== idProdutoAExcluir
                )
            );

            setIsModalOpen(false);
            setIdProdutoAExcluir(null);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    useEffect(() => {
        api.get("produtos")
        .then((response) => {
            setProdutos(response.data);
        })
        .catch((error) => {
            console.error("Erro ao buscar produto:", error);
        });
    }, []);

    return (
        <div className="container">
            <MenuPrincipal />

            <PageInfo title="Loja" />

            <p>Produtos disponíveis no IronClub.</p>

            <div>
                <Link className="btn btn-primary mb-3" to="/produtos/novo">
                    Novo Produto
                </Link>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.idProduto}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{produto.preco.toFixed(2)}</td>
                                    <td>{produto.estoque}</td>
                                    <td> 
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => openModal(produto.idProduto)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={deleteProduto}
            />

        </div>
    );
}

export default Loja;