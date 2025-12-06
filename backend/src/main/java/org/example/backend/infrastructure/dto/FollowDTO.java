package org.example.backend.infrastructure.dto;

public class FollowDTO {
    private String id;
    private String userId;
    private String mangaId;

    public FollowDTO(String id, String userId, String mangaId) {
        this.id = id;
        this.userId = userId;
        this.mangaId = mangaId;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getMangaId() {
        return mangaId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setMangaId(String mangaId) {
        this.mangaId = mangaId;
    }
}
