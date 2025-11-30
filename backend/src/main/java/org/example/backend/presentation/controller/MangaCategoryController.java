package org.example.backend.presentation.controller;

import org.example.backend.infrastructure.dto.MangaCategoryDTO;
import org.example.backend.infrastructure.dto.MangaCategoryRequest;
import org.example.backend.usecase.MangaCategoryUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/manga-category")
public class MangaCategoryController {

    private final MangaCategoryUseCase mangaCategoryUseCase;

    public MangaCategoryController(MangaCategoryUseCase mangaCategoryUseCase) {
        this.mangaCategoryUseCase = mangaCategoryUseCase;
    }

    // Lấy tất cả manga-category
    @GetMapping
    public ResponseEntity<List<MangaCategoryDTO>> getAll() {
        List<MangaCategoryDTO> list = mangaCategoryUseCase.getAll();
        return ResponseEntity.ok(list);
    }

    // Lấy theo ID
    @GetMapping("/{id}")
    public ResponseEntity<MangaCategoryDTO> getById(@PathVariable String id) {
        MangaCategoryDTO dto = mangaCategoryUseCase.getById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/manga/{idManga}")
    public ResponseEntity<List<MangaCategoryDTO>> getCategoriesByManga(@PathVariable String idManga) {
        List<MangaCategoryDTO> categories = mangaCategoryUseCase.getCategoriesByMangaId(idManga);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countByCategoryName(@RequestParam String category) {
        long total = mangaCategoryUseCase.countMangaByCategoryName(category);
        return ResponseEntity.ok(total);
    }

    // Tạo mới
    @PostMapping
    public ResponseEntity<MangaCategoryDTO> create(@RequestBody MangaCategoryRequest request) {
        MangaCategoryDTO dto = mangaCategoryUseCase.create(request);
        return ResponseEntity.ok(dto);
    }

    // Cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<MangaCategoryDTO> update(
            @PathVariable String id,
            @RequestBody MangaCategoryRequest request) {
        MangaCategoryDTO dto = mangaCategoryUseCase.update(id, request);
        return ResponseEntity.ok(dto);
    }

    // Xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        mangaCategoryUseCase.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{idManga}/categories")
    public ResponseEntity<Void> syncCategories(
            @PathVariable String idManga,
            @RequestBody List<String> categoryIds) {
        mangaCategoryUseCase.syncCategoriesForManga(idManga, categoryIds);
        return ResponseEntity.ok().build();
    }

}
