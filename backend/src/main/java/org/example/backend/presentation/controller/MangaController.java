package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.usecase.MangaUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin(origins = "*")
public class MangaController {

    private final MangaUseCase mangaUseCase;

    public MangaController(MangaUseCase mangaUseCase) {
        this.mangaUseCase = mangaUseCase;
    }

    @PostMapping
    public MangaDTO create(@RequestBody Manga manga) {
        return mangaUseCase.create(manga);
    }

    @PutMapping("/{id}")
    public MangaDTO update(@PathVariable String id, @RequestBody Manga manga) {
        return mangaUseCase.update(id, manga);
    }

    @PatchMapping("/{id}")
    public MangaDTO patch(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        return mangaUseCase.patchManga(id, updates);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        mangaUseCase.delete(id);
        return "Deleted";
    }

    @PostMapping("/by-categories")
    public List<MangaDTO> getByCategories(@RequestBody List<String> categories) {
        return mangaUseCase.getByCategoryNames(categories);
    }

    @GetMapping
    public List<MangaDTO> getAll() {
        return mangaUseCase.getAll();
    }

    @GetMapping("/{id}")
    public MangaDTO getById(@PathVariable String id) {
        return mangaUseCase.getById(id);
    }
}
