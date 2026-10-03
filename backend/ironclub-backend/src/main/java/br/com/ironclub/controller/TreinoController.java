package br.com.ironclub.controller;

import br.com.ironclub.model.entity.Treino;
import br.com.ironclub.model.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequestMapping("/api/v1/treinos")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @GetMapping("/usuario/{idUsuario}")
    public List<Treino> findByIdUsuario(@PathVariable Integer idUsuario) {
        return treinoService.findByIdUsuario(idUsuario);
    }

    @PostMapping
    public ResponseEntity<Treino> save(@RequestBody Treino treino) {

        Treino treinoSalvo = treinoService.save(treino);

        if (treinoSalvo == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(treinoSalvo);
    }

    @PutMapping("/{idTreino}")
    public ResponseEntity<Treino> update(
            @PathVariable Integer idTreino,
            @RequestBody Treino treino) {

        Treino treinoAtualizado = treinoService.update(idTreino, treino);

        if (treinoAtualizado == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(treinoAtualizado);
    }
}
