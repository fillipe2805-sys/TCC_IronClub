package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.ExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.Exercicio;

import java.util.List;

@Service
public class ExercicioService {

    @Autowired
    private ExercicioRepository exercicioRepository;

    public List<Exercicio> findAll() {
        return exercicioRepository.findAll();
    }

    public Exercicio save(Exercicio exercicio) {

        if (exercicio.getNome() == null || exercicio.getNome().isBlank()) {
            return null;
        }

        if (exercicio.getGrupoMuscular() == null || exercicio.getGrupoMuscular().isBlank()) {
            return null;
        }

        return exercicioRepository.save(exercicio);
    }
}
