package br.com.ironclub.controller;

import br.com.ironclub.model.entity.TreinoExercicio;
import br.com.ironclub.model.services.TreinoExercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/v1/treino-exercicios")
public class TreinoExercicioController {

    @Autowired
    private TreinoExercicioService treinoExercicioService;

    @GetMapping("/treino/{idTreino}")
    public List<TreinoExercicio> findByIdTreino(@PathVariable Integer idTreino) {
        return treinoExercicioService.findByIdTreino(idTreino);
    }

    @PostMapping
    public ResponseEntity<TreinoExercicio> save(@RequestBody TreinoExercicio treinoExercicio) {

        TreinoExercicio treinoExercicioSalvo = treinoExercicioService.save(treinoExercicio);

        if (treinoExercicioSalvo == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(treinoExercicioSalvo);
    }
}