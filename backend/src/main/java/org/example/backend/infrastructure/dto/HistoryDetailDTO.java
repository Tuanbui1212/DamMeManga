package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;

public class HistoryDetailDTO {

    private LocalDateTime readAt;
    private String mangaId;
    private String mangaName;
    private String mangaCover;
    private Long chapterId;
    private String chapterTitle;
    private Integer chapterNumber;

    public HistoryDetailDTO(LocalDateTime readAt,
                            String mangaId, String mangaName, String mangaCover,
                            Long chapterId, String chapterTitle, Integer chapterNumber) {
        this.readAt = readAt;
        this.mangaId = mangaId;
        this.mangaName = mangaName;
        this.mangaCover = mangaCover;
        this.chapterId = chapterId;
        this.chapterTitle = chapterTitle;
        this.chapterNumber = chapterNumber;
    }

    // Getters & Setters
    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }

    public String getMangaId() { return mangaId; }
    public void setMangaId(String mangaId) { this.mangaId = mangaId; }

    public String getMangaName() { return mangaName; }
    public void setMangaName(String mangaName) { this.mangaName = mangaName; }

    public String getMangaCover() { return mangaCover; }
    public void setMangaCover(String mangaCover) { this.mangaCover = mangaCover; }

    public Long getChapterId() { return chapterId; }
    public void setChapterId(Long chapterId) { this.chapterId = chapterId; }

    public String getChapterTitle() { return chapterTitle; }
    public void setChapterTitle(String chapterTitle) { this.chapterTitle = chapterTitle; }

    public Integer getChapterNumber() { return chapterNumber; }
    public void setChapterNumber(Integer chapterNumber) { this.chapterNumber = chapterNumber; }
}