package org.example.backend.infrastructure.dto;

public class MangaCategoryDTO {

    private String id;
    private String nameManga;
    private String nameCategory;

    public MangaCategoryDTO() {}

    public MangaCategoryDTO(String id, String nameManga, String nameCategory) {
        this.id = id;
        this.nameManga = nameManga;
        this.nameCategory = nameCategory;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNameManga() { return nameManga; }
    public void setNameManga(String mangaName) { this.nameManga = mangaName; }

    public String getNameCategory() { return nameCategory; }
    public void setNameCategory(String nameCategory) { this.nameCategory = nameCategory; }
}
