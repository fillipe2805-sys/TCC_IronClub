package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.TreinoExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.TreinoExercicio;

import java.util.List;

@Service
public class TreinoExercicioService {

    @Autowired
    private TreinoExercicioRepository treinoExercicioRepository;

    public List<TreinoExercicio> findByIdTreino(Integer idTreino) {
        return treinoExercicioRepository.findByIdTreino(idTreino);
    }

    public TreinoExercicio save(TreinoExercicio treinoExercicio) {

        if (treinoExercicio.getIdTreino() == null) {
            return null;
        }

        if (treinoExercicio.getIdExercicio() == null) {
            return null;
        }

        if (treinoExercicio.getSeries() == null || treinoExercicio.getSeries() <= 0) {
            return null;
        }

        if (treinoExercicio.getRepeticoes() == null || treinoExercicio.getRepeticoes() <= 0) {
            return null;
        }

        if (treinoExercicio.getDescanso() != null && treinoExercicio.getDescanso() < 0) {
            return null;
        }

        return treinoExercicioRepository.save(treinoExercicio);
    }
}
