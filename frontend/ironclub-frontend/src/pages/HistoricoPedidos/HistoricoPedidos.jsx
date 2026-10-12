import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../../components/PageInfo";
import api from "../../services/api";

function HistoricoPedidos() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [pedidos, setPedidos] = useState([]);
    const [itensPedido, setItensPedido] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get(`/pedidos/usuario/${usuario.idUsuario}`)
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar pedidos:", error);
            });

        api.get("/produtos")
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
            });
    }, [usuario.idUsuario]);

    const verItens = async (idPedido) => {
        try {
            const response = await api.get(`/item-pedidos/pedido/${idPedido}`);

            setItensPedido(response.data);
            setPedidoSelecionado(idPedido);
        } catch (error) {
            console.error("Erro ao buscar itens do pedido:", error);
            alert("Não foi possível carregar os itens do pedido.");
        }
    };
    let totalPedido = 0;

    for (const item of itensPedido) {
        totalPedido += Number(item.valorUnitario) * item.quantidade;
    }

    const buscarNomeProduto = (idProduto) => {
        const produto = produtos.filter(
            (item) => item.idProduto === idProduto
        )[0];

        if (produto) {
            return produto.nome;
        }

        return `Produto #${idProduto}`;
    };

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <PageInfo title="Histórico de Pedidos" descricao="Consulte suas compras e os itens de cada pedido." />

            {pedidos.length === 0 ? (
                <p className={styles.vazio}>Nenhum pedido encontrado.</p>
            ) : (
                <div>
                    <div className={`table-responsive ${styles.tabela}`}>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Pedido</th>
                                <th>Forma de entrega</th>
                                <th>Forma de pagamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.idPedido}>
                                    <td>#{pedido.idPedido}</td>
                                    <td>{pedido.formaEntrega}</td>
                                    <td>{pedido.formaPagamento || "Não informado"}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => verItens(pedido.idPedido)}
                                        >
                                            Ver Itens
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    {pedidoSelecionado !== null && (
                        <div className={styles.detalhesPedido}>

                            <h3>Itens do Pedido #{pedidoSelecionado}</h3>

                            <div className={`table-responsive ${styles.tabela}`}>
                                <table className="table table-bordered table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Preço unitário</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {itensPedido.map((item) => (
                                            <tr key={item.idItemPedido}>
                                                <td>{buscarNomeProduto(item.idProduto)}</td>
                                                <td>{item.quantidade}</td>
                                                <td>R$ {Number(item.valorUnitario).toFixed(2).replace(".", ",")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-3">
                                    <strong>Total do pedido: R$ {totalPedido.toFixed(2).replace(".", ",")}</strong>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HistoricoPedidos;
