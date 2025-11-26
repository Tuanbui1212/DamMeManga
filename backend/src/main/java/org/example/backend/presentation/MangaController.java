package org.example.backend.presentation;

<<<<<<< HEAD
import org.example.backend.domain.model.Manga;
import org.example.backend.usecase.MangaUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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
    public String deleteManga(@PathVariable String id) {
        mangaUseCase.deleteManga(id);
        return "Manga has been deleted";
    }
=======
public class MangaController {
>>>>>>> java/phungcuong
}
