package br.com.ironclub.model.services;

import br.com.ironclub.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.ironclub.model.entity.Produto;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto save(Produto produto) {

        if (produto.getNome() == null || produto.getNome().isBlank()) {
            return null;
        }

        if (produto.getCategoria() == null || produto.getCategoria().isBlank()) {
            return null;
        }

        if (produto.getPreco() == null || produto.getPreco().signum() < 0) {
            return null;
        }

        if (produto.getEstoque() == null || produto.getEstoque() < 0) {
            return null;
        }

        return produtoRepository.save(produto);
    }

    public Produto findById(Integer id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public Produto update(Integer id, Produto dados) {

        Produto produto = produtoRepository.findById(id).orElse(null);

        if (produto == null) {
            return null;
        }

        if (dados.getNome() == null || dados.getNome().isBlank()) {
            return null;
        }

        if (dados.getCategoria() == null || dados.getCategoria().isBlank()) {
            return null;
        }

        if (dados.getPreco() == null || dados.getPreco().signum() < 0) {
            return null;
        }

        if (dados.getEstoque() == null || dados.getEstoque() < 0) {
            return null;
        }

        produto.setNome(dados.getNome());
        produto.setCategoria(dados.getCategoria());
        produto.setPreco(dados.getPreco());
        produto.setEstoque(dados.getEstoque());

        return produtoRepository.save(produto);
    }

    public boolean delete(Integer id) {

        if (!produtoRepository.existsById(id)) {
            return false;
        }

        produtoRepository.deleteById(id);
        return true;
    }
}