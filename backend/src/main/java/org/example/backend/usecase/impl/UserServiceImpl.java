package org.example.backend.usecase.impl;

import org.example.backend.domain.model.User;
import org.example.backend.infrastructure.repository.UserRepository;
import org.example.backend.usecase.UserService;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(String account, String password) {
        if (userRepository.existsByAccount(account)) {
            throw new RuntimeException("Account đã tồn tại");
        }
        User user = new User();
        user.setAccount(account);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    @Override
    public User login(String account, String password) {
        User user = userRepository.findByAccount(account)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        return user;
    }

    @Override
    public User createAdmin(String account, String password) {
        if (userRepository.existsByAccount(account)) {
            throw new RuntimeException("Account đã tồn tại");
        }
        User admin = new User(account, passwordEncoder.encode(password), "admin");
        return userRepository.save(admin);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // UserServiceImpl.java
    @Override
    public User findByAccount(String account) {
        return userRepository.findByAccount(account)
                .orElse(null);
    }

}
