package org.example.backend.infrastructure.dto;

public class ChapterRequest {
    private String idManga;
    private Integer chapterNumber;
    private String title;

    // getters + setters
    public String getIdManga() { return idManga; }
    public void setIdManga(String idManga) { this.idManga = idManga; }
    public Integer getChapterNumber() { return chapterNumber; }
    public void setChapterNumber(Integer chapterNumber) { this.chapterNumber = chapterNumber; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
