package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

interface UserJpaRepository extends JpaRepository<User, String> {

    Optional<User> findByAccount(String account);

    boolean existsByAccount(String account);
}

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository jpa;

    public UserRepositoryImpl(UserJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public User registerUser(String account, String password) {
        if (jpa.existsByAccount(account)) {
            throw new RuntimeException("Account đã tồn tại");
        }

        User user = new User();
        user.setAccount(account);
        user.setPassword(password);
        user.setRole("guest");

        return jpa.save(user);
    }

    @Override
    public User createAdmin(String account, String password) {
        if (jpa.existsByAccount(account)) {
            throw new RuntimeException("Account đã tồn tại");
        }

        User admin = new User();
        admin.setAccount(account);
        admin.setPassword(password);
        admin.setRole("admin");

        return jpa.save(admin);
    }

    @Override
    public User login(String account, String password) {
        User user = jpa.findByAccount(account)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Sai mật khẩu");
        }

        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return jpa.findAll();
    }

    @Override
    public User findByAccount(String account) {
        return jpa.findByAccount(account).orElse(null);
    }

    @Override
    public boolean existsByAccount(String account) {
        return jpa.existsByAccount(account);
    }

    @Override
    public User save(User user) {
        return jpa.save(user);
    }

    @Override
    public Optional<User> findById(String id) {
        return jpa.findById(id);
    }

    @Override
    public boolean changePassword(String account, String oldPassword, String newPassword) {
        Optional<User> optionalUser = jpa.findByAccount(account);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Không tìm thấy tài khoản");
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        user.setPassword(newPassword);
        jpa.save(user);

        return true;
    }
}
