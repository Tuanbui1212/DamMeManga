package org.example.backend.domain.model;

import java.util.UUID;

import jakarta.persistence.*;

@Entity
@Table(name = "follow")
public class Follow {

    @Id
    @Column(name = "id_follow", length = 100)
    private String id;

    @Column(name = "id_user", length = 100, nullable = false)
    private String userId;

    @Column(name = "id_manga", length = 100, nullable = false)
    private String mangaId;
    

    public Follow() {
    }

    public Follow(String id, String userId, String mangaId) {
        this.id = UUID.randomUUID().toString();
        this.userId = userId;
        this.mangaId = mangaId;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getMangaId() {
        return mangaId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setMangaId(String mangaId) {
        this.mangaId = mangaId;
    }
}
