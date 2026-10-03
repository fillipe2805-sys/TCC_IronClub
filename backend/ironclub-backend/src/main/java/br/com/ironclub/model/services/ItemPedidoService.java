package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.ItemPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.ItemPedido;
import java.math.BigDecimal;

import java.util.List;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    public List<ItemPedido> findByIdPedido(Integer idPedido) {
        return itemPedidoRepository.findByIdPedido(idPedido);
    }

    public ItemPedido save(ItemPedido itemPedido) {

        if (itemPedido.getIdPedido() == null) {
            return null;
        }

        if (itemPedido.getIdProduto() == null) {
            return null;
        }

        if (itemPedido.getQuantidade() == null || itemPedido.getQuantidade() <= 0) {
            return null;
        }

        if (itemPedido.getValorUnitario() == null || itemPedido.getValorUnitario().compareTo(BigDecimal.ZERO) < 0) {
            return null;
        }

        return itemPedidoRepository.save(itemPedido);
    }
}