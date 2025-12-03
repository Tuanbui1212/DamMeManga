package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Chapter;
import org.example.backend.usecase.ChapterUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/mangas")
public class ChapterController {

    private final ChapterUseCase chapterUseCase;

    public ChapterController(ChapterUseCase chapterUseCase) {
        this.chapterUseCase = chapterUseCase;
    }

    // Tạo chapter mới
    @PostMapping("chapters")
    public Chapter createChapter(@RequestBody Chapter chapter) {
        return chapterUseCase.createChapter(chapter);
    }

    // Lấy tất cả chapter
    @GetMapping("chapters")
    public List<Chapter> getAllChapters() {
        return chapterUseCase.getAllChapters();
    }

    // Lấy chapter theo ID
    @GetMapping("/chapters/{id}")
    public Optional<Chapter> getChapterById(@PathVariable String id) {
        return chapterUseCase.getChapterById(id);
    }

    // Cập nhật chapter
    @PutMapping("/chapters/{id}")
    public Chapter updateChapter(@PathVariable String id, @RequestBody Chapter chapter) {
        return chapterUseCase.updateChapter(id, chapter);
    }

    // Xóa chapter
    @DeleteMapping("/chapters/{id}")
    String deleteChapter(@PathVariable String id) {
        chapterUseCase.deleteChapter(id);
        return "Delete success";
    }

    @GetMapping("/{idManga}/chapters")
    public List<Chapter> getChaptersByMangaId(@PathVariable String idManga) {
        return chapterUseCase.getChaptersByMangaId(idManga);
    }
}
