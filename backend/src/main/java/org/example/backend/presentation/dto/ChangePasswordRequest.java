package org.example.backend.presentation.dto;

public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public String getNewPassword() { return newPassword; }
}
