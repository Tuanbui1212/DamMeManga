package org.example.backend.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comment", nullable = false, updatable = false)
    private Long idComment;

    @Column(name = "id_user")
    private String idUser;

    @Column(name = "id_chapter")
    private Long idChapter;

    @Column(name = "title")
    private String title;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    public Comment() { }

    @PrePersist
    protected void onCreate() {
        createAt = LocalDateTime.now();
    }

    // Getters and Setters
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
