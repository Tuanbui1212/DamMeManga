package org.example.backend.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "history")
public class History {

    @Id
    @Column(name = "id_history", length = 100)
    private String idHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_manga", referencedColumnName = "id_manga", nullable = false)
    private Manga manga;

    @Column(name = "last_read")
    private LocalDateTime lastRead;

    public History() {
    }

    public History(String idHistory, User user, Manga manga, LocalDateTime lastRead) {
        this.idHistory = idHistory;
        this.user = user;
        this.manga = manga;
        this.lastRead = lastRead;
    }

    public History(String idHistory) {
        this.idHistory = idHistory;
    }

    @PrePersist
    public void prePersist() {
        if (lastRead == null) {
            lastRead = LocalDateTime.now();
        }
    }

    public String getIdHistory() {
        return idHistory;
    }

    public void setIdHistory(String idHistory) {
        this.idHistory = idHistory;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Manga getManga() {
        return manga;
    }

    public void setManga(Manga manga) {
        this.manga = manga;
    }

    public LocalDateTime getLastRead() {
        return lastRead;
    }

    public void setLastRead(LocalDateTime lastRead) {
        this.lastRead = lastRead;
    }

    // ===== DEBUG =====

    @Override
    public String toString() {
        return "History{" +
                "idHistory='" + idHistory + '\'' +
                ", user=" + (user != null ? user.getIdUser() : "null") +
                ", manga=" + (manga != null ? manga.getIdManga() : "null") +
                ", lastRead=" + lastRead +
                '}';
    }
}
