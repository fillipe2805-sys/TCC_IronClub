package br.com.ironclub.controller;

import br.com.ironclub.model.entity.ItemPedido;
import br.com.ironclub.model.services.ItemPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/item-pedidos")
public class ItemPedidoController {

    @Autowired
    private ItemPedidoService itemPedidoService;

    @GetMapping("/pedido/{idPedido}")
    public List<ItemPedido> findByIdPedido(@PathVariable Integer idPedido) {
        return itemPedidoService.findByIdPedido(idPedido);
    }
}