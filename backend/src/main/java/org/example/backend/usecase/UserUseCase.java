package org.example.backend.usecase;

import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Đăng ký user
    public User registerUser(String account, String password) {

        // KIỂM TRA TRÙNG ACCOUNT = findByAccount()
        if (userRepository.findByAccount(account) != null) {
            throw new RuntimeException("Account đã tồn tại");
        }

        User user = new User();
        user.setAccount(account);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("guest");

        return userRepository.registerUser(account, passwordEncoder.encode(password));
    }

    // Login
    public User login(String account, String password) {
        User user = userRepository.findByAccount(account);

        if (user == null) {
            throw new RuntimeException("Tài khoản không tồn tại");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        return user;
    }

    // Tạo admin
    public User createAdmin(String account, String password) {

        if (userRepository.findByAccount(account) != null) {
            throw new RuntimeException("Account đã tồn tại");
        }

        return userRepository.createAdmin(account, passwordEncoder.encode(password));
    }

    // Lấy toàn bộ user
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    // Tìm theo account
    public User findByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    // Đổi mật khẩu
     public boolean changePassword(String account, String oldPassword, String newPassword) {
        User user = userRepository.findByAccount(account);
        if (user == null) {
            throw new RuntimeException("Không tìm thấy tài khoản");
        }

        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        // Encode password mới và lưu
        String newHashedPassword = passwordEncoder.encode(newPassword);
        return userRepository.changePassword(account, newHashedPassword);
    }
}
