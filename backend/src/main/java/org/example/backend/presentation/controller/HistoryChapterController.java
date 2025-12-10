package org.example.backend.presentation.controller;

import org.example.backend.infrastructure.dto.HistoryChapterDTO;
import org.example.backend.usecase.HistoryChapterUseCase;
import org.example.backend.domain.model.HistoryChapter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/history-chapter")
@CrossOrigin("*")
public class HistoryChapterController {

    private final HistoryChapterUseCase useCase;

    public HistoryChapterController(HistoryChapterUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping("/read")
    public HistoryChapter recordReading(@RequestParam String historyId, @RequestParam Long chapterId) {
        return useCase.recordHistoryChapter(historyId, chapterId);
    }

    @GetMapping
    public List<HistoryChapter> getAll() {
        return useCase.getAllHistoryChapters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoryChapter> getById(@PathVariable Long id) {
        return useCase.getHistoryChapterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/history/{historyId}")
    public List<HistoryChapterDTO> getByHistory(@PathVariable String historyId) {
        return useCase.getHistoryChaptersByHistory(historyId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        useCase.deleteHistoryChapter(id);
        return ResponseEntity.noContent().build();
    }
}
