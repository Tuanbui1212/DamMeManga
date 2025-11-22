package org.example.backend.infrastructure.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @Column(name = "id_user", length = 100)
    private String idUser;

    @Column(name = "account", length = 20, nullable = false, unique = true)
    private String account;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "role", length = 10, nullable = false)
    private String role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public UserEntity() {
        this.idUser = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.role = "guest";
    }

    public UserEntity(String account, String password, String role) {
        this.idUser = UUID.randomUUID().toString();
        this.account = account;
        this.password = password;
        this.role = role;
        this.createdAt = LocalDateTime.now();
    }

    // Getters & Setters
    public String getIdUser() { return idUser; }
    public void setIdUser(String idUser) { this.idUser = idUser; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
