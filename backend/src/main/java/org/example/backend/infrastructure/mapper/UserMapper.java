package org.example.backend.infrastructure.mapper;

import org.example.backend.domain.model.User;
import org.example.backend.infrastructure.entity.UserEntity;

public class UserMapper {

    public User toDomain(UserEntity entity) {
        return new User(
                entity.getIdUser(),
                entity.getAccount(),
                entity.getPassword(),
                entity.getRole(),
                entity.getCreatedAt());
    }

    public UserEntity toEntity(User domain) {
        UserEntity entity = new UserEntity();
        entity.setIdUser(domain.getIdUser());
        entity.setAccount(domain.getAccount());
        entity.setPassword(domain.getPassword());
        entity.setRole(domain.getRole());
        entity.setCreatedAt(domain.getCreatedAt());
        return entity;
    }
}
