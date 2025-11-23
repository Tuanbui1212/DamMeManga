package org.example.backend.domain.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "id_category", length = 100)
    private String idCategory;

    @Column(name = "name_category", length = 36)
    private String nameCategory;

    @Column(name = "description", length = 1000)
    private String description;

    public Category() {
        // Tự tạo UUID khi new entity
        this.idCategory = UUID.randomUUID().toString();
    }

    public Category(String nameCategory, String description) {
        this.idCategory = UUID.randomUUID().toString();
        this.nameCategory = nameCategory;
        this.description = description;
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
}
