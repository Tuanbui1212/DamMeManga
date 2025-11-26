package org.example.backend.infrastructure.mapper;

import org.example.backend.domain.model.User;
import org.example.backend.infrastructure.entity.UserEntity;

public class UserMapper {

    // Chuyển từ entity sang domain
    public User toDomain(UserEntity entity) {
        return new User(
                entity.getIdUser(),
                entity.getAccount(),
                entity.getPassword(),
                User.Role.valueOf(entity.getRole()), // chuyển String sang enum Role
                entity.getCreatedAt()
        );
    }

    // Chuyển từ domain sang entity
    public UserEntity toEntity(User domain) {
        UserEntity entity = new UserEntity();
        entity.setIdUser(domain.getIdUser());
        entity.setAccount(domain.getAccount());
        entity.setPassword(domain.getPassword());
        entity.setRole(domain.getRole().name()); // lưu enum Role dưới dạng String
        entity.setCreatedAt(domain.getCreatedAt());
        return entity;
    }
}
