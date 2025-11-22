package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByAccount(String account);

    boolean existsByAccount(String account);

    void save(User user);

    List<User> findAll();
}
