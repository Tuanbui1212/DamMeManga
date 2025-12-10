package org.example.backend.infrastructure.dto;

public class ChapterDTO {
    private Long idChapter;
    private Integer chapterNumber;
    private String title;

    public ChapterDTO(Long idChapter, Integer chapterNumber, String title) {
        this.idChapter = idChapter;
        this.chapterNumber = chapterNumber;
        this.title = title;
    }

    public Long getIdChapter() {
        return idChapter;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public String getTitle() {
        return title;
    }
}
