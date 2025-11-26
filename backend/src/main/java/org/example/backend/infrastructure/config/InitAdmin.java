package org.example.backend.infrastructure.config;

import org.example.backend.domain.model.User;
import org.example.backend.infrastructure.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitAdmin {

    @Bean
    CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByAccount("admin")) {
                User admin = new User();
                admin.setAccount("admin");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setRole("admin");
                userRepository.save(admin);
                System.out.println(">>> Admin account created !");
            }
        };
    }
}
