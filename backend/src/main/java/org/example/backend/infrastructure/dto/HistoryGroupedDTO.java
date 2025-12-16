package org.example.backend.infrastructure.dto;

import java.time.LocalDateTime;
import java.util.List;

public class HistoryGroupedDTO {
    private LocalDateTime date;
    private String mangaId;
    private String title;
    private String cover;
    private List<ChapterInfo> chapters;

    public HistoryGroupedDTO() {}

    // Getters / Setters
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public String getMangaId() { return mangaId; }
    public void setMangaId(String mangaId) { this.mangaId = mangaId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCover() { return cover; }
    public void setCover(String cover) { this.cover = cover; }
    public List<ChapterInfo> getChapters() { return chapters; }
    public void setChapters(List<ChapterInfo> chapters) { this.chapters = chapters; }

    public static class ChapterInfo {
        private Long id;
        private Integer number;
        private String title;
        private LocalDateTime readAt;

        public ChapterInfo() {}

        public ChapterInfo(Long id, Integer number, String title, LocalDateTime readAt) {
            this.id = id;
            this.number = number;
            this.title = title;
            this.readAt = readAt;
        }

        // Getters / Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Integer getNumber() { return number; }
        public void setNumber(Integer number) { this.number = number; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public LocalDateTime getReadAt() { return readAt; }
        public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }
    }
}
