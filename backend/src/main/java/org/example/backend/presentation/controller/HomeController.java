package org.example.backend.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @Autowired(required = false)
    private DataSource dataSource;

    @GetMapping("/")
    public String home() {
        return "Hello! Server Backend đang chạy ngon lành cành đào!";
    }

    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "DamMeManga Backend (Spring Boot 3.5)");
        response.put("timestamp", Instant.now().toString());

        Map<String, Object> dbInfo = new HashMap<>();
        dbInfo.put("provider", "mysql-tidb");

        boolean dbConnected = false;
        if (dataSource != null) {
            try (Connection conn = dataSource.getConnection()) {
                if (conn.isValid(2)) {
                    dbConnected = true;
                }
            } catch (Exception e) {
                dbConnected = false;
                dbInfo.put("error", e.getMessage());
            }
        }

        dbInfo.put("status", dbConnected ? "connected" : "disconnected");
        response.put("database", dbInfo);

        if (!dbConnected) {
            response.put("status", "degraded");
            return ResponseEntity.status(503).body(response);
        }

        return ResponseEntity.ok(response);
    }
}
