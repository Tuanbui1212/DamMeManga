package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Author;
import org.example.backend.usecase.AuthorUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "*")
public class AuthorController {

    @Autowired
    private AuthorUseCase authorUseCase;

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorUseCase.getAllAuthors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable String id) {
        return authorUseCase.getAuthorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        return authorUseCase.createAuthor(author);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable String id, @RequestBody Author author) {
        return authorUseCase.updateAuthor(id, author);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable String id) {
        authorUseCase.deleteAuthor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public long countAuthors() {
        return authorUseCase.countAuthors();
    }
}
