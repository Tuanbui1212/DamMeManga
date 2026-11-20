package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.infrastructure.dto.PageResponse;
import org.example.backend.usecase.MangaUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;


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

    @GetMapping("/paged")
    public PageResponse<MangaDTO> getMangasPaged(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "18") int size,
            @RequestParam(defaultValue = "updateAt,desc") String sort) {
        return mangaUseCase.getMangasPaged(query, category, status, page, size, sort);
    }

    @GetMapping("/top")
    public List<MangaDTO> getTopMangas(@RequestParam(defaultValue = "30") int limit) {
        return mangaUseCase.getTopMangas(limit);
    }

    @GetMapping("/latest")
    public List<MangaDTO> getLatestMangas(@RequestParam(defaultValue = "30") int limit) {
        return mangaUseCase.getLatestMangas(limit);
    }

    @GetMapping("/search")
    public List<MangaDTO> search(@RequestParam(value = "q", defaultValue = "") String query,
                                 @RequestParam(defaultValue = "10") int limit) {
        return mangaUseCase.search(query, limit);
    }

    @GetMapping("/{id}")
    public MangaDTO getById(@PathVariable String id) {
        return mangaUseCase.getById(id);
    }

    @GetMapping("count")
    public long getTotalMangas() {
        return mangaUseCase.getTotalMangas();
    }

    @GetMapping("totalviews")
    public long getTotalViews() {
        return mangaUseCase.getTotalViews();
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<Void> increaseView(@PathVariable String id) {
        mangaUseCase.increaseView(id);
        return ResponseEntity.ok().build();
    }
}
