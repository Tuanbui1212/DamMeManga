package org.example.backend.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "history_chapter")
public class HistoryChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_history_chapter")
    private Long idHistoryChapter;

    @Column(name = "id_history", length = 100, nullable = false)
    private String idHistory;

    @Column(name = "id_chapter", length = 100, nullable = false)
    private Long idChapter;

    @Column(name = "read_at")
    private LocalDateTime readAt = LocalDateTime.now();

    public HistoryChapter() {
    }

    public HistoryChapter(Long idHistoryChapter, String idHistory, Long idChapter, LocalDateTime readAt) {
        this.idHistoryChapter = idHistoryChapter;
        this.idHistory = idHistory;
        this.idChapter = idChapter;
        this.readAt = readAt;
    }

    // Getters và Setters
    public Long getIdHistoryChapter() {
        return idHistoryChapter;
    }

    public void setIdHistoryChapter(Long idHistoryChapter) {
        this.idHistoryChapter = idHistoryChapter;
    }

    public String getIdHistory() {
        return idHistory;
    }

    public void setIdHistory(String idHistory) {
        this.idHistory = idHistory;
    }

    public Long getIdChapter() {
        return idChapter;
    }

    public void setIdChapter(Long idChapter) {
        this.idChapter = idChapter;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}
