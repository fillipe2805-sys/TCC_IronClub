import styles from "./Loja.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";
import api from "../../services/api";
import Modal from "../../components/Modal";
import imagemPadrao from "../../assets/produto-padrao.webp";

function Loja() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const ehAdmin = usuario.tipoUsuario === "ADMIN";

    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [categoria, setCategoria] = useState("");
    const [ordenacao, setOrdenacao] = useState("nome");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idProdutoAExcluir, setIdProdutoAExcluir] = useState(null);

    const categorias = [...new Set(produtos.map((produto) => produto.categoria))]
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(pesquisa.trim().toLowerCase()) &&
        (categoria === "" || produto.categoria === categoria)
    ).sort((a, b) => {
        if (ordenacao === "menorPreco") return a.preco - b.preco;
        if (ordenacao === "maiorPreco") return b.preco - a.preco;
        if (ordenacao === "nomeDecrescente") return b.nome.localeCompare(a.nome, "pt-BR");
        return a.nome.localeCompare(b.nome, "pt-BR");
    });

    const openModal = (idProduto) => {
        setIdProdutoAExcluir(idProduto);
        setIsModalOpen(true);
    };

    const deleteProduto = async () => {
        try {
            await api.delete(`/produtos/${idProdutoAExcluir}`);
            const produtosRestantes = produtos.filter((produto) => produto.idProduto !== idProdutoAExcluir);
            setProdutos(produtosRestantes);
            if (categoria && !produtosRestantes.some((produto) => produto.categoria === categoria)) {
                setCategoria("");
            }
            setIsModalOpen(false);
            setIdProdutoAExcluir(null);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Não foi possível excluir o produto. Ele pode estar vinculado a um pedido.");
        }
    };

    const adicionarAoCarrinho = (produto) => {
        const chave = `carrinho_${usuario.idUsuario}`;
        const carrinho = JSON.parse(localStorage.getItem(chave)) || [];

        if (produto.estoque <= 0) {
            alert("Produto sem estoque!");
            return;
        }

        const item = carrinho.filter((item) => item.idProduto === produto.idProduto)[0];

        if (item) {
            if (item.quantidade >= produto.estoque) {
                alert("Quantidade máxima em estoque atingida!");
                return;
            }
            item.quantidade += 1;
        } else {
            carrinho.push({
                idProduto: produto.idProduto,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: 1
            });
        }

        localStorage.setItem(chave, JSON.stringify(carrinho));
        alert("Produto adicionado ao carrinho!");
    };

    useEffect(() => {
        api.get("produtos")
            .then((response) => setProdutos(response.data))
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
                setErro("Não foi possível carregar os produtos. Tente novamente mais tarde.");
            })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <div className={`container ${styles.pagina}`}>
            <MenuPrincipal />

            <main>
                <section className={styles.banner}>
                    <div>
                        <span className={styles.destaque}>LOJA IRONCLUB</span>
                        <h1>Mais energia. Mais resultados.</h1>
                        <p>Encontre suplementos para acompanhar sua rotina de treinos.</p>
                    </div>
                </section>

                <section aria-labelledby="tituloCatalogo">
                    <div className={styles.cabecalho}>
                        <div>
                            <h2 id="tituloCatalogo">Suplementos</h2>
                            <p>Escolha seus produtos e retire na academia.</p>
                        </div>
                        {ehAdmin && (
                            <Link className="btn btn-primary" to="/produtos/novo">+ Novo Produto</Link>
                        )}
                    </div>

                    <div className={styles.filtros}>
                        <div>
                            <label className="form-label" htmlFor="pesquisaProduto">Pesquisar suplemento</label>
                            <input
                                id="pesquisaProduto"
                                type="search"
                                className="form-control"
                                placeholder="Digite o nome do suplemento..."
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="categoriaProduto">Categoria</label>
                            <select
                                id="categoriaProduto"
                                className="form-select"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <option value="">Todas</option>
                                {categorias.map((nome) => <option key={nome} value={nome}>{nome}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="ordenacaoProduto">Ordenar por</label>
                            <select
                                id="ordenacaoProduto"
                                className="form-select"
                                value={ordenacao}
                                onChange={(e) => setOrdenacao(e.target.value)}
                            >
                                <option value="nome">Nome: A a Z</option>
                                <option value="nomeDecrescente">Nome: Z a A</option>
                                <option value="menorPreco">Menor preço</option>
                                <option value="maiorPreco">Maior preço</option>
                            </select>
                        </div>
                    </div>

                    {carregando ? (
                        <p className={styles.vazio} role="status">Carregando produtos...</p>
                    ) : erro ? (
                        <p className="alert alert-danger" role="alert">{erro}</p>
                    ) : (
                        <>
                            <p className={styles.resultados} role="status">
                                {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "produto encontrado" : "produtos encontrados"}
                            </p>

                            {produtosFiltrados.length === 0 ? (
                                <p className={styles.vazio}>
                                    {pesquisa.trim() || categoria
                                        ? "Nenhum suplemento corresponde à pesquisa ou à categoria selecionada."
                                        : "Nenhum suplemento disponível."}
                                </p>
                            ) : (
                                <div className={styles.grid}>
                                    {produtosFiltrados.map((produto) => (
                                        <article className={styles.produto} key={produto.idProduto}>
                                            <div className={styles.foto}>
                                                <img
                                                    src={produto.imagemUrl || imagemPadrao}
                                                    alt={produto.imagemUrl ? produto.nome : "Imagem ilustrativa de suplemento"}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        if (e.currentTarget.getAttribute("src") !== imagemPadrao) {
                                                            e.currentTarget.src = imagemPadrao;
                                                            e.currentTarget.alt = "Imagem ilustrativa de suplemento";
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.informacoes}>
                                                <span className={styles.categoria}>{produto.categoria}</span>
                                                <h3>{produto.nome}</h3>
                                                <p className={styles.preco}>
                                                    {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                                </p>
                                                <p className={`${styles.estoque} ${produto.estoque <= 0 ? styles.esgotado : ""}`}>
                                                    <span aria-hidden="true"></span>
                                                    {produto.estoque > 0
                                                        ? `${produto.estoque} unidades disponíveis`
                                                        : "Sem estoque (0 disponíveis)"}
                                                </p>
                                                <button
                                                    className={`btn btn-primary ${styles.adicionar}`}
                                                    onClick={() => adicionarAoCarrinho(produto)}
                                                    disabled={produto.estoque <= 0}
                                                >
                                                    Adicionar ao Carrinho
                                                </button>
                                                {ehAdmin && (
                                                    <div className={styles.acoesAdmin}>
                                                        <Link className="btn btn-outline-secondary btn-sm" to={`/produtos/${produto.idProduto}/editar`}>Editar</Link>
                                                        <button className="btn btn-danger btn-sm" onClick={() => openModal(produto.idProduto)}>Excluir</button>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                            {produtosFiltrados.length > 0 && (
                                <p className={styles.avisoImagem}>Produtos sem foto cadastrada ou com imagem indisponível utilizam uma foto ilustrativa.</p>
                            )}
                        </>
                    )}
                </section>
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={deleteProduto} />
        </div>
    );
}

export default Loja;