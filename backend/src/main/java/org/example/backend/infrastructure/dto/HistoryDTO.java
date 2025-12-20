package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class HistoryDTO {
    private String idHistory;
    private String userId;
    private String mangaId;
    private LocalDateTime lastRead;

    public HistoryDTO(String idHistory, String userId, String mangaId, LocalDateTime lastRead) {
        this.idHistory = idHistory;
        this.userId = userId;
        this.mangaId = mangaId;
        this.lastRead = lastRead;
    }

    public String getIdHistory() {
        return idHistory;
    }

    public void setIdHistory(String idHistory) {
        this.idHistory = idHistory;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMangaId() {
        return mangaId;
    }

    public void setMangaId(String mangaId) {
        this.mangaId = mangaId;
    }

    public LocalDateTime getLastRead() {
        return lastRead;
    }

    public void setLastRead(LocalDateTime lastRead) {
        this.lastRead = lastRead;
    }
}
