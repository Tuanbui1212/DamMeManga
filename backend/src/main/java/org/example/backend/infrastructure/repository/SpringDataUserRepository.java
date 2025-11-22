package org.example.backend.infrastructure.repository;

import org.example.backend.infrastructure.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataUserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByAccount(String account);

    boolean existsByAccount(String account);
}
