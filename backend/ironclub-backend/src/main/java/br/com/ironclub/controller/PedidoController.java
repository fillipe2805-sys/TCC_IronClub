package br.com.ironclub.controller;

import br.com.ironclub.model.entity.ItemPedido;
import br.com.ironclub.model.entity.Pedido;
import br.com.ironclub.model.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/finalizar")
    public ResponseEntity<Pedido> finalizarCompra(
            @RequestParam Integer idUsuario,
            @RequestParam String formaEntrega,
            @RequestBody List<ItemPedido> itens) {

        Pedido pedido = pedidoService.finalizarCompra(
                idUsuario,
                formaEntrega,
                itens
        );

        if (pedido == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(pedido);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Pedido> findByIdUsuario(@PathVariable Integer idUsuario) {
        return pedidoService.findByIdUsuario(idUsuario);
    }
}