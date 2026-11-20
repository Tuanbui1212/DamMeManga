package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.usecase.MangaDetailUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/mangas")
@CrossOrigin("*")
public class MangaDetailController {
    private final MangaDetailUseCase mangaDetailUseCase;

    public MangaDetailController(MangaDetailUseCase mangaDetailUseCase) {
        this.mangaDetailUseCase = mangaDetailUseCase;
    }

    @GetMapping
    public List<Manga> getAllMangas(){
        return mangaDetailUseCase.findAllManga();
    }

    @GetMapping("/{idManga}")
    public Manga getMangaWithChapters(@PathVariable String idManga) {
        return mangaDetailUseCase.getMangaWithChapters(idManga);
    }
}
