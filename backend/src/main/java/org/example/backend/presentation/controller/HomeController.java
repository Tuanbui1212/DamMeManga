package org.example.backend.presentation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Hello! Server Backend đang chạy ngon lành cành đào!";
    }
}
