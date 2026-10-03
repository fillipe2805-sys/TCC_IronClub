package br.com.ironclub.controller;

import br.com.ironclub.model.entity.Exercicio;
import br.com.ironclub.model.services.ExercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/exercicios")
public class ExercicioController {

    @Autowired
    private ExercicioService exercicioService;

    @GetMapping
    public List<Exercicio> findAll() {
        return exercicioService.findAll();
    }

    @PostMapping
    public ResponseEntity<Exercicio> save(@RequestBody Exercicio exercicio) {

        Exercicio exercicioSalvo = exercicioService.save(exercicio);

        if (exercicioSalvo == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(exercicioSalvo);
    }
}