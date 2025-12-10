package org.example.backend.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_comment;

    private Long id_user;

    private Long id_chapter;

    private String title;

    private LocalDateTime create_at;

    public Comment() {
        this.create_at = LocalDateTime.now();
    }

    // Getters và Setters
    public Long getId_comment() { return id_comment; }
    public void setId_comment(Long id_comment) { this.id_comment = id_comment; }
    public Long getId_user() { return id_user; }
    public void setId_user(Long id_user) { this.id_user = id_user; }
    public Long getId_chapter() { return id_chapter; }
    public void setId_chapter(Long id_chapter) { this.id_chapter = id_chapter; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDateTime getCreate_at() { return create_at; }
    public void setCreate_at(LocalDateTime create_at) { this.create_at = create_at; }
}
