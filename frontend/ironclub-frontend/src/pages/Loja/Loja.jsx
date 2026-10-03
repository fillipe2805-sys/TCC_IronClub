import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";

function Loja() {

    const [produtos, setProdutos] = useState([]);

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

            <div>
                <h1>Loja</h1>
                <p>Produtos disponíveis no IronClub.</p>

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
                            </tr>
                        </thead>

                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.idProduto}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{produto.preco.toFixed(2)}</td>
                                    <td>{produto.estoque}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Loja;