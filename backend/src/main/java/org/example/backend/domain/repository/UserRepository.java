package org.example.backend.domain.repository;

import org.example.backend.domain.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User registerUser(String account, String password);

    User createAdmin(String account, String password);

    User login(String account, String password);

    List<User> getAllUsers();

    User findByAccount(String account);

    boolean changePassword(String account, String newHashedPassword);

    boolean existsByAccount(String account);

    User save(User user);

    Optional<User> findById(String id);

}
