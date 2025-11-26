package org.example.backend.usecase;

import  org.example.backend.domain.model.User;

import java.util.List;

public interface UserService {

    // Đăng ký user bình thường (guest)
    User registerUser(String account, String password);

    // Tạo admin (chỉ admin mới dùng)
    User createAdmin(String account, String password);

    // Login
    User login(String account, String password);

    // Lấy tất cả user
    List<User> getAllUsers();

    // UserService.java
    User findByAccount(String account);

    boolean changePassword(String account, String oldPassword, String newPassword);

}
