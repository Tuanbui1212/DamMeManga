package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Comment;
import org.example.backend.domain.repository.CommentRepository;
import org.example.backend.infrastructure.dto.CommentDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface JpaCommentRepository extends JpaRepository<Comment,Long> {
    @Query("SELECT new org.example.backend.infrastructure.dto.CommentDTO(" +
            "   c.idComment, " +
            "   c.idUser, " +
            "   u.account, " +
            "   c.idChapter, " +
            "   c.title, " +
            "   c.createAt, " +
            "   c.isDeleted) " +
            "FROM Comment c " +
            "LEFT JOIN User u ON c.idUser = u.idUser " +
            "WHERE c.idChapter = :chapterId " +
            "ORDER BY c.createAt ASC")
    List<CommentDTO> findByIdChapter(@Param("chapterId") Long chapterId);
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
    public List<CommentDTO> findByChapterId(Long idChapter) {
        return jpaCommentRepository.findByIdChapter(idChapter);
    }
}
