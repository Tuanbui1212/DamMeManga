package org.example.backend.usecase;

import org.example.backend.domain.model.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    List<Author> getAllAuthors();

    Optional<Author> getAuthorById(String id);

    Author createAuthor(Author author);

    Author updateAuthor(String id, Author author);

    void deleteAuthor(String id);
}
