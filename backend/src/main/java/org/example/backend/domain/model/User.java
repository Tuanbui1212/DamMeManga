package org.example.backend.domain.model;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    public enum Role {
        GUEST, ADMIN
    }

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Id
    @Column(name = "id_user", length = 100)
    private String idUser;

    @Column(name = "account", length = 20, nullable = false, unique = true)
    private String account;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 10, nullable = false)
    private Role role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // --- Constructor mặc định: guest user ---
    public User() {
        this.idUser = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.role = Role.GUEST;
    }

    // --- Constructor cho account/password + role ---
    public User(String account, String password, Role role) {
        this.idUser = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.account = account;
        this.password = passwordEncoder.encode(password);
        this.role = role;
    }

    // --- Constructor đầy đủ ---
    public User(String idUser, String account, String password, Role role, LocalDateTime createdAt) {
        this.idUser = idUser;
        this.account = account;
        this.password = passwordEncoder.encode(password);
        this.role = role;
        this.createdAt = createdAt;
    }

    // --- Getter & Setter ---
    public String getIdUser() { return idUser; }
    public void setIdUser(String idUser) { this.idUser = idUser; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = passwordEncoder.encode(password); }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
