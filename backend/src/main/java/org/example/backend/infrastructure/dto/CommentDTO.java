package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long idComment;
    private String idUser;
    private String nameUser;
    private Long idChapter;
    private String title;
    private LocalDateTime createAt;
    private boolean isDeleted;

    public CommentDTO() {
    }

    public CommentDTO(Long idComment, String idUser, String nameUser, Long idChapter, String title, LocalDateTime createAt,  boolean isDeleted) {
        this.idComment = idComment;
        this.idUser = idUser;
        this.nameUser = nameUser;
        this.idChapter = idChapter;
        this.title = title;
        this.createAt = createAt;
        this.isDeleted = isDeleted;
    }

    public Long getIdComment() {
        return idComment;
    }

    public void setIdComment(Long idComment) {
        this.idComment = idComment;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
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

    public boolean isDeleted() {
        return isDeleted;
    }
    public void setDeleted(boolean deleted) {
        this.isDeleted = deleted;
    }
}