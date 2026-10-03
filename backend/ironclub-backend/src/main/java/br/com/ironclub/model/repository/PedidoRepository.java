package br.com.ironclub.model.repository;

import br.com.ironclub.model.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByIdUsuario(Integer idUsuario);
}