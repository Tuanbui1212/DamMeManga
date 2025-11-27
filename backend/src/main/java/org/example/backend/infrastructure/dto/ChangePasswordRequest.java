package org.example.backend.infrastructure.dto;

public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public String getNewPassword() { return newPassword; }
}
