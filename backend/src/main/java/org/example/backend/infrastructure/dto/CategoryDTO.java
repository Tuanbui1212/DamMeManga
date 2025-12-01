package org.example.backend.infrastructure.dto;

public class CategoryDTO {
    private String idCategory;
    private String nameCategory;
    private String description;
    private long mangaCount;

    public CategoryDTO() {
    }

    public CategoryDTO(String idCategory, String nameCategory, String description, long mangaCount) {
        this.idCategory = idCategory;
        this.nameCategory = nameCategory;
        this.description = description;
        this.mangaCount = mangaCount;
    }

    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

    public String getNameCategory() {
        return nameCategory;
    }

    public void setNameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getMangaCount() {
        return mangaCount;
    }

    public void setMangaCount(long mangaCount) {
        this.mangaCount = mangaCount;
    }
}
