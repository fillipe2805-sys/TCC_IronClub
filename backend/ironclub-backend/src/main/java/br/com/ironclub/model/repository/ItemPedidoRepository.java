package br.com.ironclub.model.repository;

import br.com.ironclub.model.entity.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer> {

    List<ItemPedido> findByIdPedido(Integer idPedido);
}