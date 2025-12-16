package org.example.backend.infrastructure.dto;

import java.util.List;

public class HistoryMangaDTO {

    private String mangaId;
    private String mangaName;
    private List<HistoryChapterDTO> chapters;

    public HistoryMangaDTO(String mangaId, String mangaName, List<HistoryChapterDTO> chapters) {
        this.mangaId = mangaId;
        this.mangaName = mangaName;
        this.chapters = chapters;
    }

    public String getMangaId() {
        return mangaId;
    }

    public void setMangaId(String mangaId) {
        this.mangaId = mangaId;
    }

    public String getMangaName() {
        return mangaName;
    }

    public void setMangaName(String mangaName) {
        this.mangaName = mangaName;
    }

    public List<HistoryChapterDTO> getChapters() {
        return chapters;
    }

    public void setChapters(List<HistoryChapterDTO> chapters) {
        this.chapters = chapters;
    }
}
