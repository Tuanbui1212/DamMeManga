package org.example.backend.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "author")
public class Author {

    @Id
    private String idAuthor;

    private String nameAuthor;

    // Constructor không tham số
    public Author() {
        // Tự tạo UUID khi new entity
        this.idAuthor = UUID.randomUUID().toString();
    }

    // Constructor có tham số nameAuthor
    public Author(String nameAuthor) {
        this.idAuthor = UUID.randomUUID().toString();
        this.nameAuthor = nameAuthor;
    }

    public String getIdAuthor() {
        return idAuthor;
    }

    public void setIdAuthor(String idAuthor) {
        this.idAuthor = idAuthor;
    }

    public String getNameAuthor() {
        return nameAuthor;
    }

    public void setNameAuthor(String nameAuthor) {
        this.nameAuthor = nameAuthor;
    }
}
