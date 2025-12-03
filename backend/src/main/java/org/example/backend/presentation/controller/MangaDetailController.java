package org.example.backend.presentation.controller;

import org.example.backend.domain.model.MangaDetail;
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
    public List<MangaDetail> getAllMangas(){
        return mangaDetailUseCase.findAllManga();
    }


    // API trả Manga kèm danh sách Chapter
    @GetMapping("/{idManga}")
    public MangaDetail getMangaWithChapters(@PathVariable String idManga) {
        return mangaDetailUseCase.getMangaWithChapters(idManga);
    }
}
