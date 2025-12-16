package org.example.backend.presentation.controller;

import org.example.backend.usecase.FollowUseCase;
import org.example.backend.domain.model.Follow;
import org.example.backend.infrastructure.dto.FollowDTO;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/follows")
public class FollowController {

    private final FollowUseCase followUseCase;

    public FollowController(FollowUseCase followUseCase) {
        this.followUseCase = followUseCase;
    }

    @PostMapping
    public Follow follow(@RequestParam String userId, @RequestParam String mangaId) {
        return followUseCase.follow(userId, mangaId);
    }

    @GetMapping("/user/{userId}")
    public List<FollowDTO> getFollowingMangas(@PathVariable String userId) {
        return followUseCase.getFollowingMangas(userId);
    }

    @DeleteMapping("/{id}")
    public void unfollow(@PathVariable String id) {
        followUseCase.unfollow(id);
    }
}
