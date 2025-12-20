package org.example.backend.infrastructure.dto;

public class TopMangaFollowDTO {
    private String mangaId;
    private Long followCount;
    private String nameManga;

    public TopMangaFollowDTO(
            String mangaId,
            Long followCount,
            String nameManga) {
        this.mangaId = mangaId;
        this.followCount = followCount;
        this.nameManga = nameManga;
    }

    public String getMangaId() {
        return mangaId;
    }

    public Long getFollowCount() {
        return followCount;
    }

    public String getNameManga() {
        return nameManga;
    }
}
