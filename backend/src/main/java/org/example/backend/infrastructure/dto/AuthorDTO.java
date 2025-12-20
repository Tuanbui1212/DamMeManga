package org.example.backend.infrastructure.dto;

public class AuthorDTO {
    private String idAuthor;
    private String nameAuthor;

    public AuthorDTO(String idAuthor, String nameAuthor) {
        this.idAuthor = idAuthor;
        this.nameAuthor = nameAuthor;
    }

    public String getIdAuthor() {
        return idAuthor;
    }

    public String getNameAuthor() {
        return nameAuthor;
    }
}
