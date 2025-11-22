package org.example.backend.usecase;

import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RegisterUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterUserUseCase(UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(String account, String password) {
        if (userRepository.existsByAccount(account)) {
            throw new RuntimeException("Account đã tồn tại");
        }

        User user = new User(
                java.util.UUID.randomUUID().toString(),
                account,
                passwordEncoder.encode(password),
                "guest",
                java.time.LocalDateTime.now()
        );

        userRepository.save(user);
        return user;
    }
}
