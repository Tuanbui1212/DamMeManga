package org.example.backend.usecase;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorUseCase {

    @Autowired
    private AuthorRepository authorRepository;

    public List<Author> getAllAuthors() {
        return authorRepository.getAllAuthors();
    }

    public Optional<Author> getAuthorById(String id) {
        return authorRepository.getAuthorById(id);
    }

    @Transactional  
    public Author createAuthor(Author author) {
        return authorRepository.createAuthor(author);
    }

    @Transactional
    public Author updateAuthor(String id, Author author) {
        return authorRepository.updateAuthor(id, author);
    }

    @Transactional
    public void deleteAuthor(String id) {
        authorRepository.deleteAuthor(id);
    }

    public long countAuthors() {
        return authorRepository.countAuthors();
    }
}
