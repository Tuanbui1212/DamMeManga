package org.example.backend.infrastructure.dto;

import java.util.List;

public class FollowDetailDTO {
    private String followId;
    private String userId;
    private String mangaId;
    private String mangaTitle;
    private String mangaPoster;
    private String authorName;
    private List<String> chapters; 

    public FollowDetailDTO(String followId, String userId, String mangaId,
            String mangaTitle, String mangaPoster, String authorName, List<String> chapters) {
        this.followId = followId;
        this.userId = userId;
        this.mangaId = mangaId;
        this.mangaTitle = mangaTitle;
        this.mangaPoster = mangaPoster;
        this.authorName = authorName;
        this.chapters = chapters;
    }

    public String getFollowId() {
        return followId;
    }

    public void setFollowId(String followId) {
        this.followId = followId;
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

    public String getMangaTitle() {
        return mangaTitle;
    }

    public void setMangaTitle(String mangaTitle) {
        this.mangaTitle = mangaTitle;
    }

    public String getMangaPoster() {
        return mangaPoster;
    }

    public void setMangaPoster(String mangaPoster) {
        this.mangaPoster = mangaPoster;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public List<String> getChapters() {
        return chapters;
    }

    public void setChapters(List<String> chapters) {
        this.chapters = chapters;
    }
}
