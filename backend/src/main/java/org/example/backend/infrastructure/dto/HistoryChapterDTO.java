package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class HistoryChapterDTO {
    private Long idHistoryChapter;
    private String idHistory;
    private Long  idChapter;
    private LocalDateTime readAt;

    public HistoryChapterDTO(Long idHistoryChapter, String idHistory, Long  idChapter, LocalDateTime readAt) {
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

    public Long  getIdChapter() {
        return idChapter;
    }

    public void setIdChapter(Long  idChapter) {
        this.idChapter = idChapter;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}
