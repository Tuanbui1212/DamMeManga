package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.usecase.MangaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin(origins = "*")
public class MangaController {

    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping
    public MangaDTO create(@RequestBody Manga manga) {
        return mangaService.create(manga); // trả MangaDTO
    }

    @PutMapping("/{id}")
    public MangaDTO update(@PathVariable String id, @RequestBody Manga manga) {
        return mangaService.update(id, manga); // trả MangaDTO
    }

    @PatchMapping("/{id}")
    public MangaDTO patch(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        return mangaService.patchManga(id, updates); // trả MangaDTO
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        mangaService.delete(id);
        return "Deleted";
    }

    @GetMapping
    public List<MangaDTO> getAll() {
        return mangaService.getAll();
    }

    @GetMapping("/{id}")
    public MangaDTO getById(@PathVariable String id) {
        return mangaService.getById(id);
    }

    @GetMapping("/by-categories")
    public List<MangaDTO> getByCategories(@RequestBody List<String> categories) {
        return mangaService.getByCategoryNames(categories);
    }
}
