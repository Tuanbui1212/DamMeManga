package org.example.backend.presentation.controller;

import org.example.backend.domain.model.User;
import org.example.backend.usecase.UserUseCase;
import org.example.backend.infrastructure.config.security.JwtUtil;
import org.example.backend.infrastructure.dto.AuthRequest;
import org.example.backend.infrastructure.dto.AuthResponse;
import org.example.backend.infrastructure.dto.ChangePasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserUseCase userUseCase;
    private final JwtUtil jwtUtil;

    public UserController(UserUseCase userUseCase, JwtUtil jwtUtil) {
        this.userUseCase = userUseCase;
        this.jwtUtil = jwtUtil;
    }

    // --- Register guest ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            User user = userUseCase.registerUser(request.getAccount(), request.getPassword());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            User user = userUseCase.login(request.getAccount(), request.getPassword());
            String token = jwtUtil.generateToken(user.getAccount(), user.getRole());

            return ResponseEntity.ok(
                    new AuthResponse(token, user.getRole(), user.getAccount(), user.getIdUser()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // --- Create admin (admin-only) ---
    @PostMapping("/admin")
    public ResponseEntity<?> createAdmin(@RequestHeader("Authorization") String authHeader,
            @RequestBody AuthRequest request) {
        try {
            // Check token
            String token = authHeader.substring(7);
            String role = jwtUtil.extractRole(token);
            if (!"admin".equals(role)) {
                return ResponseEntity.status(403).body("Chỉ admin mới tạo admin được");
            }

            User admin = userUseCase.createAdmin(request.getAccount(), request.getPassword());
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Get all users (admin-only) ---
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String role = jwtUtil.extractRole(token);
        if (!"admin".equals(role)) {
            return ResponseEntity.status(403).body("Chỉ admin mới xem được danh sách");
        }
        List<User> users = userUseCase.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request) {

        try {
            String token = authHeader.substring(7);
            String account = jwtUtil.extractAccount(token);

            userUseCase.changePassword(account, request.getOldPassword(), request.getNewPassword());

            return ResponseEntity.ok("Đổi mật khẩu thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
