package org.example.backend.domain.service;

import org.example.backend.domain.model.User;

public class UserDomainService {

    public boolean isPasswordCorrect(User user, String rawPassword, PasswordChecker checker) {
        return checker.matches(rawPassword, user.getPassword());
    }

    public interface PasswordChecker {
        boolean matches(String raw, String encoded);
    }
}
