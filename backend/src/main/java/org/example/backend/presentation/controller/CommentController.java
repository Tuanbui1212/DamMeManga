package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Comment;
import org.example.backend.infrastructure.dto.CommentDTO;
import org.example.backend.usecase.CommentUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentUseCase commentUseCase;

    public CommentController(CommentUseCase commentUseCase) {
        this.commentUseCase = commentUseCase;
    }

    @PostMapping
    public CommentDTO createComment(@RequestBody Comment comment) {
        return commentUseCase.createComment(comment);
    }

    @GetMapping("/{id}")
    public Optional<Comment> getComment(@PathVariable Long id) {
        return commentUseCase.getCommentById(id);
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentUseCase.getAllComments();
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentUseCase.updateComment(id, comment.getTitle());
    }

    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        commentUseCase.deleteComment(id);
        return "Comment with ID " + id + " has been deleted.";
    }

    @GetMapping("/chapter/{chapterId}")
    public List<CommentDTO> getCommentsByChapter(@PathVariable Long chapterId) {
        return commentUseCase.getCommentsByChapter(chapterId);
    }
}

