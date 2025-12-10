package org.example.backend.domain.repository;

import org.example.backend.domain.model.Comment;
import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    Comment save(Comment comment);
    Optional<Comment> findById(Long id);
    List<Comment> findAll();
    Comment update(Comment comment);
    void delete(Long id);
    List<Comment> findByChapterId(Long id_chapter);
}
