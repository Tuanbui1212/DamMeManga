// package org.example.backend.domain.model;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "manga_category")
// public class MangaCategory {

//     @Id
//     @Column(name = "id_manga_category", length = 100)
//     private String id;

//     @ManyToOne
//     @JoinColumn(name = "manga_id")
//     private Manga manga;

//     @ManyToOne
//     @JoinColumn(name = "category_id")
//     private Category category;

//     public MangaCategory() {}

//     public MangaCategory(String id, Manga manga, Category category) {
//         this.id = id;
//         this.manga = manga;
//         this.category = category;
//     }

//     // GETTER & SETTER
//     public String getId() { return id; }
//     public void setId(String id) { this.id = id; }

//     public Manga getManga() { return manga; }
//     public void setManga(Manga manga) { this.manga = manga; }

//     public Category getCategory() { return category; }
//     public void setCategory(Category category) { this.category = category; }
// }
