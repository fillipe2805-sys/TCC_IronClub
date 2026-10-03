package br.com.ironclub.controller;

import br.com.ironclub.model.entity.Produto;
import br.com.ironclub.model.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> findAll() {
        return produtoService.findAll();
    }

    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody Produto produto) {

        Produto produtoSalvo = produtoService.save(produto);

        if (produtoSalvo == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(produtoSalvo);
    }

    @GetMapping("/{id}")
    public Produto findById(@PathVariable Integer id) {
        return produtoService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable Integer id, @RequestBody Produto produto) {

        Produto produtoAtualizado = produtoService.update(id, produto);

        if (produtoAtualizado == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(produtoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {

        boolean excluido = produtoService.delete(id);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
