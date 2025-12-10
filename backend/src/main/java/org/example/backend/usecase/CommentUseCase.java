package org.example.backend.usecase;

import org.example.backend.domain.model.Comment;
import org.example.backend.domain.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentUseCase {

    private final CommentRepository commentRepository;

    public CommentUseCase(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment updateComment(Long id, String title) {
        Optional<Comment> commentOpt = commentRepository.findById(id);
        if(commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setTitle(title);
            return commentRepository.update(comment);
        }
        return null;
    }

    public void deleteComment(Long id) {
        commentRepository.delete(id);
    }

    public List<Comment> getCommentsByChapter(Long chapterId) {
        return commentRepository.findByChapterId(chapterId);
    }
}
