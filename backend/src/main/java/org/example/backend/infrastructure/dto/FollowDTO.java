package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class FollowDTO {

    private String followId;
    private String mangaId;
    private String mangaName;
    private String posterUrl;
    private Long lastChapter;
    private LocalDateTime updatedAt;

    public FollowDTO(String followId, String mangaId, String mangaName, String posterUrl, Long lastChapter,
            LocalDateTime updatedAt) {
        this.followId = followId;
        this.mangaId = mangaId;
        this.mangaName = mangaName;
        this.posterUrl = posterUrl;
        this.lastChapter = lastChapter;
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getFollowId() {
        return followId;
    }

    public String getMangaId() {
        return mangaId;
    }

    public String getMangaName() {
        return mangaName;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public Long getLastChapter() {
        return lastChapter;
    }

}
