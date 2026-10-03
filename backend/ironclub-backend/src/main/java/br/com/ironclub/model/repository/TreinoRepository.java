package br.com.ironclub.model.repository;

import br.com.ironclub.model.entity.Treino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreinoRepository extends JpaRepository<Treino, Integer> {

    List<Treino> findByIdUsuario(Integer idUsuario);
}
