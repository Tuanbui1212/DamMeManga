package org.example.backend.usecase;

import org.example.backend.domain.model.Comment;
import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.CommentRepository;
import org.example.backend.domain.repository.UserRepository;
import org.example.backend.infrastructure.dto.CommentResponse; // Import đúng DTO bạn vừa tạo
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentUseCase {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentUseCase(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
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

    public List<CommentResponse> getCommentsByChapter(Long chapterId) {
        List<Comment> comments = commentRepository.findByChapterId(chapterId);

        return comments.stream().map(comment -> {
            Optional<User> userOpt = userRepository.findById(comment.getIdUser());
            String nameOfUser = "Unknown User";
            if (userOpt.isPresent()) {
                nameOfUser = userOpt.get().getAccount();
            }

            return new CommentResponse(
                    comment.getIdComment(),
                    nameOfUser,
                    comment.getIdChapter(),
                    comment.getTitle(),
                    comment.getCreateAt()
            );
        }).collect(Collectors.toList());
    }
}