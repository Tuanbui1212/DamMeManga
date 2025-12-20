package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.repository.AuthorRepository;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public class AuthorRepositoryImpl implements AuthorRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Author> getAllAuthors() {
        String query = "SELECT a FROM Author a";
        return entityManager.createQuery(query, Author.class).getResultList();
    }

    public Optional<Author> getAuthorById(String id) {
        Author author = entityManager.find(Author.class, id);
        return Optional.ofNullable(author);
    }

    @Transactional
    public Author createAuthor(Author author) {
        entityManager.persist(author);
        return author;
    }

    @Transactional
    public Author updateAuthor(String id, Author newData) {
        Author existing = entityManager.find(Author.class, id);
        if (existing == null) {
            throw new RuntimeException("Author not found with id: " + id);
        }
        existing.setNameAuthor(newData.getNameAuthor());
        return existing;
    }

    @Transactional
    public void deleteAuthor(String id) {
        Author author = entityManager.find(Author.class, id);
        if (author != null) {
            entityManager.remove(author);
        }
    }

    public long countAuthors() {
        String query = "SELECT COUNT(a) FROM Author a";
        return entityManager.createQuery(query, Long.class)
                .getSingleResult();
    }
}
