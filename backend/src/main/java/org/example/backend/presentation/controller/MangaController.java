package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.usecase.MangaUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/mangas")
public class MangaController {
    private final MangaUseCase mangaUseCase;

    public MangaController(MangaUseCase mangaUseCase) {
        this.mangaUseCase = mangaUseCase;
    }

    @GetMapping
    public List<Manga> getAllMangas() {
        return mangaUseCase.getAllMangas();
    }

    @GetMapping("/{id}")
    public Optional<Manga> getMangaById(@PathVariable String id) {
        return mangaUseCase.getMangaById(id);
    }

    @PostMapping
    public Manga createManga(@RequestBody Manga manga) {
        return mangaUseCase.createManga(manga);
    }

    @DeleteMapping("/{id}")
    public void deleteManga(@PathVariable String id) {
        mangaUseCase.deleteManga(id);
    }
}
