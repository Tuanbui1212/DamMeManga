package org.example.backend.infrastructure.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String account;


    public AuthResponse(String token, String role, String account) {
        this.token = token;
        this.role = role;
        this.account = account;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getAccount() { return account; }

}