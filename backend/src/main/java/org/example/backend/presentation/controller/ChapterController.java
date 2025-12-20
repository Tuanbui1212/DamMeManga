package org.example.backend.presentation.controller;

import org.example.backend.domain.model.Chapter;
import org.example.backend.infrastructure.dto.ChapterRequest;
import org.example.backend.usecase.ChapterUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/mangas")
public class ChapterController {

    private final ChapterUseCase chapterUseCase;

    public ChapterController(ChapterUseCase chapterUseCase) {
        this.chapterUseCase = chapterUseCase;
    }

    @PostMapping("chapters")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createChapter(@RequestBody ChapterRequest chapter) {
        Chapter newChapter = chapterUseCase.createChapter(chapter);
        return Map.of(
                "message", "Thêm chapter thành công!",
                "data", newChapter
        );
    }

    @GetMapping("chapters")
    public List<Chapter> getAllChapters() {
        return chapterUseCase.getAllChapters();
    }

    @GetMapping("/chapters/{id}")
    public Chapter getChapterById(@PathVariable Long id) {
        return chapterUseCase.getChapterById(id);
    }

    @PutMapping("/chapters/{id}")
    public Chapter updateChapter(@PathVariable Long id, @RequestBody ChapterRequest chapter) {
        return chapterUseCase.updateChapter(id, chapter);
    }

    @DeleteMapping("/chapters/{id}")
    public String deleteChapter(@PathVariable Long id) {
        chapterUseCase.deleteChapter(id);
        return "Xóa Chapter thành công";
    }

    @GetMapping("/{idManga}/chapters")
    public List<Chapter> getChaptersByMangaId(@PathVariable String idManga) {
        return chapterUseCase.getChaptersByMangaId(idManga);
    }

    @GetMapping("/first-chapter/{idManga}")
    public List<Chapter> findFirstChapterByMangaId(@PathVariable String idManga) {
        return chapterUseCase.findFirstChapterByMangaId(idManga);
    }
    
}
