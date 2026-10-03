package br.com.ironclub.model.repository;

import br.com.ironclub.model.entity.TreinoExercicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreinoExercicioRepository extends JpaRepository<TreinoExercicio, Integer> {

    List<TreinoExercicio> findByIdTreino(Integer idTreino);
}