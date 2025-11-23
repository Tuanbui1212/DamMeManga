package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByAccount(String account);

    boolean existsByAccount(String account);
}
