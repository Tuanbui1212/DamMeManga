package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.usecase.UserMangaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/mangas")
@CrossOrigin("*")
public class UserMangaController {
    private final UserMangaUseCase userMangaUseCase;

    public UserMangaController(UserMangaUseCase userMangaUseCase) {
        this.userMangaUseCase = userMangaUseCase;
    }

    @GetMapping
    public List<Manga> getAllMangas(){
        return userMangaUseCase.findAllManga();
    }

    @GetMapping("/{id}")
    public Optional<Manga> getMangaById(@PathVariable String id){
        return userMangaUseCase.findMangaById(id);
    }
}
