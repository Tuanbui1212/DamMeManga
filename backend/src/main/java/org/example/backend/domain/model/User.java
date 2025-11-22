package org.example.backend.domain.model;

import java.time.LocalDateTime;

public class User {
    private String idUser;
    private String account;
    private String password;
    private String role; 
    private LocalDateTime createdAt;

    public User(String idUser, String account, String password, String role, LocalDateTime createdAt) {
        this.idUser = idUser;
        this.account = account;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }

    // Getter
    public String getIdUser() { return idUser; }
    public String getAccount() { return account; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Setter
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
}
