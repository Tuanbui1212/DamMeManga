package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Comment;
import org.example.backend.domain.repository.CommentRepository;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface JpaCommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByIdChapter(Long idChapter);
    //List<Comment> findByIdChapterAndIsDeletedFalse(Long idChapter);
}

@Repository
public class CommentRepositoryImpl implements CommentRepository {

    @Autowired
    private JpaCommentRepository jpaCommentRepository;

    @Override
    public Comment save(Comment comment) {
        return jpaCommentRepository.save(comment);
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return jpaCommentRepository.findById(id);
    }

    @Override
    public List<Comment> findAll() {
        return jpaCommentRepository.findAll();
    }

    @Override
    public Comment update(Comment comment) {
        return jpaCommentRepository.save(comment);
    }

    @Override
    public void delete(Long id) {
       jpaCommentRepository.deleteById(id);
    }

    @Override
    public List<Comment> findByChapterId(Long idChapter) {
        return jpaCommentRepository.findByIdChapter(idChapter);
    }
}
