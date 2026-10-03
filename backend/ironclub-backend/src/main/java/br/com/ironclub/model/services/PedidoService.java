package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.Pedido;
import br.com.ironclub.model.repository.ItemPedidoRepository;
import br.com.ironclub.model.repository.ProdutoRepository;
import br.com.ironclub.model.repository.UsuarioRepository;
import br.com.ironclub.model.entity.ItemPedido;
import br.com.ironclub.model.entity.Produto;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Pedido> findByIdUsuario(Integer idUsuario) {
        return pedidoRepository.findByIdUsuario(idUsuario);
    }

    public Pedido save(Pedido pedido) {

        if (pedido.getIdUsuario() == null) {
            return null;
        }

        if (pedido.getFormaEntrega() == null || pedido.getFormaEntrega().isBlank()) {
            return null;
        }

        return pedidoRepository.save(pedido);
    }

    public Pedido finalizarCompra(Integer idUsuario, String formaEntrega, List<ItemPedido> itens) {

        if (idUsuario == null || !usuarioRepository.existsById(idUsuario)) {
            return null;
        }

        if (formaEntrega == null || formaEntrega.isBlank()) {
            return null;
        }

        if (itens == null || itens.isEmpty()) {
            return null;
        }

        // Primeiro valida todos os produtos antes de criar o pedido
        for (ItemPedido item : itens) {

            if (item.getIdProduto() == null) {
                return null;
            }

            if (item.getQuantidade() == null || item.getQuantidade() <= 0) {
                return null;
            }

            Produto produto = produtoRepository.findById(item.getIdProduto()).orElse(null);

            if (produto == null) {
                return null;
            }

            if (produto.getEstoque() < item.getQuantidade()) {
                return null;
            }
        }

        Pedido pedido = new Pedido();
        pedido.setIdUsuario(idUsuario);
        pedido.setFormaEntrega(formaEntrega);

        pedido = pedidoRepository.save(pedido);

        for (ItemPedido item : itens) {

            Produto produto = produtoRepository.findById(item.getIdProduto()).orElse(null);

            item.setIdPedido(pedido.getIdPedido());

            // O preço vem do banco, e não do JSON enviado pelo usuário
            item.setValorUnitario(produto.getPreco());

            itemPedidoRepository.save(item);

            produto.setEstoque(
                    produto.getEstoque() - item.getQuantidade()
            );

            produtoRepository.save(produto);
        }

        return pedido;
    }
}
