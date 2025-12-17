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

    public User registerUser(String account, String password) {

        if (userRepository.findByAccount(account) != null) {
            throw new RuntimeException("Account đã tồn tại");
        }

        User user = new User();
        user.setAccount(account);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("guest");

        return userRepository.registerUser(account, passwordEncoder.encode(password));
    }

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

    public User createAdmin(String account, String password) {

        if (userRepository.findByAccount(account) != null) {
            throw new RuntimeException("Account đã tồn tại");
        }

        return userRepository.createAdmin(account, passwordEncoder.encode(password));
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public User findByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    public boolean changePassword(String account, String oldPassword, String newPassword) {
        User user = userRepository.findByAccount(account);
        if (user == null) {
            throw new RuntimeException("Không tìm thấy tài khoản");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        String newHashedPassword = passwordEncoder.encode(newPassword);
        return userRepository.changePassword(account, newHashedPassword);
    }

    public long countUsers() {
        return userRepository.countUsers();
    }
}
