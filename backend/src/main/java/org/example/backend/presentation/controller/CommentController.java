package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Comment;
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
    public Comment createComment(@RequestBody Comment comment) {
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
    public void deleteComment(@PathVariable Long id) {
        commentUseCase.deleteComment(id);
    }

    @GetMapping("/chapter/{chapterId}")
    public List<Comment> getCommentsByChapter(@PathVariable Long chapterId) {
        return commentUseCase.getCommentsByChapter(chapterId);
    }
}

