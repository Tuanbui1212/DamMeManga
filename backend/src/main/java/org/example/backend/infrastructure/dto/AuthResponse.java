package org.example.backend.infrastructure.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String account;
    private String idUser;

    public AuthResponse(String token, String role, String account, String idUser) {
        this.token = token;
        this.role = role;
        this.account = account;
        this.idUser = idUser;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getAccount() {
        return account;
    }

    public String getIdUser() {
        return idUser;
    }
}
