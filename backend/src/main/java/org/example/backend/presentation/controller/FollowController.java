package org.example.backend.presentation.controller;

import org.example.backend.usecase.FollowUseCase;
import org.example.backend.domain.model.Follow;
import org.example.backend.infrastructure.dto.FollowDTO;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/follows")
public class FollowController {

    private final FollowUseCase followUseCase;

    public FollowController(FollowUseCase followUseCase) {
        this.followUseCase = followUseCase;
    }

    @GetMapping
    public List<Follow> getAllFollows() {
        return followUseCase.getAllFollows();
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

    @GetMapping("/top-mangas")
    public List<org.example.backend.infrastructure.dto.TopMangaFollowDTO> getTopMangaFollowed() {
        return followUseCase.getTopMangaFollowed();
    }
}
