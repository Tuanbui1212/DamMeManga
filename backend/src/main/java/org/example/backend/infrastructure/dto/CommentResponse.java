package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class CommentResponse {
    private Long idComment;
    private String nameUser;
    private Long idChapter;
    private String title;
    private LocalDateTime createAt;

    // Constructor mặc định (cần thiết để tránh lỗi khi làm việc với JSON)
    public CommentResponse() {
    }

    // Constructor đầy đủ tham số
    public CommentResponse(Long idComment, String nameUser, Long idChapter, String title, LocalDateTime createAt) {
        this.idComment = idComment;
        this.nameUser = nameUser;
        this.idChapter = idChapter;
        this.title = title;
        this.createAt = createAt;
    }

    // --- Các Getters và Setters đầy đủ ---

    public Long getIdComment() {
        return idComment;
    }

    public void setIdComment(Long idComment) {
        this.idComment = idComment;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public Long getIdChapter() {
        return idChapter;
    }

    public void setIdChapter(Long idChapter) {
        this.idChapter = idChapter;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}