package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.TreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.Treino;

import java.util.List;

@Service
public class TreinoService {

    @Autowired
    private TreinoRepository treinoRepository;

    public List<Treino> findByIdUsuario(Integer idUsuario) {
        return treinoRepository.findByIdUsuario(idUsuario);
    }

    public Treino save(Treino treino) {

        if (treino.getIdUsuario() == null) {
            return null;
        }

        if (treino.getNome() == null || treino.getNome().isBlank()) {
            return null;
        }

        if (treino.getGrupoMuscular() == null || treino.getGrupoMuscular().isBlank()) {
            return null;
        }

        return treinoRepository.save(treino);
    }

    public Treino update(Integer idTreino, Treino dados) {

        Treino treino = treinoRepository.findById(idTreino).orElse(null);

        if (treino == null) {
            return null;
        }

        if (dados.getNome() == null || dados.getNome().isBlank()) {
            return null;
        }

        if (dados.getGrupoMuscular() == null || dados.getGrupoMuscular().isBlank()) {
            return null;
        }

        treino.setNome(dados.getNome());
        treino.setGrupoMuscular(dados.getGrupoMuscular());

        return treinoRepository.save(treino);
    }
}
