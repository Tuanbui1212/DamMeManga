package org.example.backend.presentation.controller;

import org.example.backend.domain.model.ImgChapter;
import org.example.backend.usecase.ImgChapterUseCase;
import org.example.backend.infrastructure.dto.ImgChapterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chapters")
public class ImgChapterController {

    private final ImgChapterUseCase imgChapterUseCase;

    public ImgChapterController(ImgChapterUseCase imgChapterUseCase) {
        this.imgChapterUseCase = imgChapterUseCase;
    }

    // POST /api/chapters/images/
    @PostMapping("/images")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createImgChapters(@RequestBody List<ImgChapterRequest> requests) {
        List<ImgChapter> newImages = imgChapterUseCase.createImgChapters(requests);
        return Map.of(
                "message", "Thêm ảnh chapter thành công!",
                "data", newImages
        );
    }

    // GET /api/chapters/images/{id}
    @GetMapping("/images/{id}")
    public ImgChapter getImgChapterById(@PathVariable Long id) {
        return imgChapterUseCase.getImgChapterById(id);
    }

    // GET /api/chapters/{chapterId}/images
    @GetMapping("/{chapterId}/images")
    public List<ImgChapter> getImgsByChapterId(@PathVariable Long chapterId) {
        return imgChapterUseCase.getImgsByChapterId(chapterId);
    }

    // GET /api/chapters/images
    @GetMapping("/images")
    public List<ImgChapter> getAllImgChapters() {
        return imgChapterUseCase.getAllImgChapters();
    }

    // PUT /api/chapters/images/{id}
    @PutMapping("/images/{id}")
    public ImgChapter updateImgChapter(@PathVariable Long id, @RequestBody ImgChapterRequest request) {
        return imgChapterUseCase.updateImgChapter(id, request);
    }

    // DELETE /api/chapters/images/{id}
    @DeleteMapping("/images/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> deleteImgChapter(@PathVariable Long id) {
        imgChapterUseCase.deleteImgChapter(id);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("timestamp", Instant.now().toString());
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Image chapter with ID " + id + " deleted successfully.");

        return response;
    }
}