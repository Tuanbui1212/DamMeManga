package org.example.backend.domain.repository;

import org.example.backend.domain.model.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorRepository {

    List<Author> getAllAuthors();

    Optional<Author> getAuthorById(String id);

    Author createAuthor(Author author);

    Author updateAuthor(String id, Author author);

    void deleteAuthor(String id);
}
