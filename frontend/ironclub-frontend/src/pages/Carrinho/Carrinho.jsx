import styles from "../../styles/Layout.module.css";
import { useState } from "react";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import PageInfo from "../../components/PageInfo";
import api from "../../services/api";

function Carrinho() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const chave = `carrinho_${usuario.idUsuario}`;

    const [carrinho, setCarrinho] = useState(
        JSON.parse(localStorage.getItem(chave)) || []
    );

    const formaEntrega = "RETIRADA";
    const [formaPagamento, setFormaPagamento] = useState("PIX");
    const [finalizando, setFinalizando] = useState(false);
    const [alterando, setAlterando] = useState(false);

    let total = 0;

    for (const item of carrinho) {
        total += item.preco * item.quantidade;
    }

    const removerProduto = (idProduto) => {

        if (alterando || finalizando) {
            return;
        }

        const novoCarrinho = carrinho.filter(
            (item) => item.idProduto !== idProduto
        );

        setCarrinho(novoCarrinho);
        localStorage.setItem(chave, JSON.stringify(novoCarrinho));
    };
    const alterarQuantidade = async (idProduto, alteracao) => {

        if (alterando || finalizando) {
            return;
        }

        const itemCarrinho = carrinho.filter(
            (item) => item.idProduto === idProduto
        )[0];

        if (!itemCarrinho) {
            return;
        }

        if (alteracao === -1 && itemCarrinho.quantidade === 1) {
            return;
        }

        setAlterando(true);

        if (alteracao === 1) {
            try {
                const response = await api.get(`/produtos/${idProduto}`);

                if (itemCarrinho.quantidade >= response.data.estoque) {
                    alert("Quantidade máxima em estoque atingida!");
                    setAlterando(false);
                    return;
                }
            } catch (error) {
                console.error("Erro ao verificar estoque:", error);
                alert("Não foi possível verificar o estoque.");
                setAlterando(false);
                return;
            }
        }

        const novoCarrinho = carrinho.map((item) =>
            item.idProduto === idProduto
                ? { ...item, quantidade: item.quantidade + alteracao }
                : item
        );

        setCarrinho(novoCarrinho);
        localStorage.setItem(chave, JSON.stringify(novoCarrinho));

        setAlterando(false);
    };

    const finalizarCompra = async () => {

        if (finalizando || alterando || carrinho.length === 0) {
            return;
        }

        setFinalizando(true);

        const itens = carrinho.map((item) => ({
            idProduto: item.idProduto,
            quantidade: item.quantidade
        }));

        try {
            await api.post(
                `/pedidos/finalizar?idUsuario=${usuario.idUsuario}&formaEntrega=${formaEntrega}&formaPagamento=${formaPagamento}`,
                itens
            );

            setCarrinho([]);
            localStorage.removeItem(chave);

            alert("Compra finalizada com sucesso!");
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            alert("Não foi possível finalizar a compra. Verifique o estoque e tente novamente.");
        }

        setFinalizando(false);
    };

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <PageInfo title="Carrinho de Compras" descricao="Revise os produtos antes de finalizar a compra." />

            {carrinho.length === 0 ? (
                <p className={styles.vazio}>Seu carrinho está vazio.</p>
            ) : (
                <div className={styles.carrinho}>
                    <div className={`table-responsive ${styles.tabela}`}>
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {carrinho.map((item) => (
                                    <tr key={item.idProduto}>
                                        <td>{item.nome}</td>
                                        <td>R$ {item.preco.toFixed(2).replace(".", ",")}</td>
                                        <td>
                                            <div className={styles.quantidade}>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => alterarQuantidade(item.idProduto, -1)}
                                                    disabled={item.quantidade === 1 || alterando || finalizando}
                                                >
                                                    -
                                                </button>

                                                {item.quantidade}

                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => alterarQuantidade(item.idProduto, 1)}
                                                    disabled={alterando || finalizando}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removerProduto(item.idProduto)}
                                                disabled={alterando || finalizando}
                                            >
                                                Remover
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.resumo}>
                        <h3>Total da compra</h3>
                        <p className={styles.total}>
                            <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
                        </p>

                        <p>Os produtos deverão ser retirados na academia.</p>

                        <div className="mb-3">
                            <label htmlFor="formaPagamento" className="form-label">
                                Forma de pagamento
                            </label>

                            <select
                                id="formaPagamento"
                                className="form-select"
                                value={formaPagamento}
                                onChange={(e) => setFormaPagamento(e.target.value)}
                            >
                                <option value="PIX">PIX</option>
                                <option value="CARTAO">Cartão</option>
                                <option value="DINHEIRO">Dinheiro</option>
                            </select>

                            <p className="form-text">
                                Pagamento simulado. Nenhuma cobrança será realizada.
                            </p>
                        </div>
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={finalizarCompra}
                            disabled={finalizando || alterando}
                        >
                            {finalizando ? "Finalizando..." : "Finalizar Compra"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrinho;
