package org.example.backend.usecase;

import org.example.backend.domain.model.Comment;
import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.CommentRepository;
import org.example.backend.domain.repository.UserRepository;
import org.example.backend.infrastructure.dto.CommentDTO; // Import đúng DTO bạn vừa tạo
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentUseCase {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public CommentUseCase(CommentRepository commentRepository, UserRepository userRepository,  SimpMessagingTemplate messagingTemplate) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public CommentDTO createComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);

        String nameUser = "Unknown";
        Optional<User> userOpt = userRepository.findById(savedComment.getIdUser());
        if (userOpt.isPresent()) {
            nameUser = userOpt.get().getAccount();
        }

        CommentDTO dto = new CommentDTO(
                savedComment.getIdComment(),
                savedComment.getIdUser(),
                nameUser,
                savedComment.getIdChapter(),
                savedComment.getTitle(),
                savedComment.getCreateAt(),
                savedComment.isDeleted()
        );

        messagingTemplate.convertAndSend("/topic/chapter/" + savedComment.getIdChapter(), dto);
        return dto;
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
        Optional<Comment> commentOpt = commentRepository.findById(id);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setDeleted(true);
            commentRepository.update(comment);

            CommentDTO deleteSignal = new CommentDTO();
            deleteSignal.setIdComment(comment.getIdComment());
            deleteSignal.setIdChapter(comment.getIdChapter());
            deleteSignal.setDeleted(true);

            messagingTemplate.convertAndSend("/topic/chapter/" + comment.getIdChapter(), deleteSignal);
        }
    }

public List<CommentDTO> getCommentsByChapter(Long chapterId) {
    List<Comment> comments = commentRepository.findByChapterId(chapterId);

    return comments.stream().map(comment -> {

        String nameUser = "Guest";

        if (comment.getIdUser() != null && !comment.getIdUser().isBlank()) {
            userRepository.findById(comment.getIdUser())
                    .ifPresent(user -> {
                        // overwrite name
                    });
            Optional<User> userOpt = userRepository.findById(comment.getIdUser());
            if (userOpt.isPresent()) {
                nameUser = userOpt.get().getAccount();
            }
        }

        return new CommentDTO(
                comment.getIdComment(),
                comment.getIdUser(),     // String
                nameUser,
                comment.getIdChapter(),
                comment.getTitle(),
                comment.getCreateAt(),
                comment.isDeleted()
        );
    }).collect(Collectors.toList());
}

}