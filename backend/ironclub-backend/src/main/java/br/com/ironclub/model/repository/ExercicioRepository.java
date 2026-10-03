package br.com.ironclub.model.repository;

import br.com.ironclub.model.entity.Exercicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExercicioRepository extends JpaRepository<Exercicio, Integer> {

}