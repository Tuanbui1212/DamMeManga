package org.example.backend.usecase;

import org.example.backend.domain.model.ImgChapter;
import org.example.backend.domain.repository.ChapterRepository;
import org.example.backend.domain.repository.ImgChapterRepository;
import org.example.backend.infrastructure.dto.ImgChapterRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ImgChapterUseCase {

    private final ImgChapterRepository imgChapterRepository;
    private final ChapterRepository chapterRepository;

    public ImgChapterUseCase(ImgChapterRepository imgChapterRepository, ChapterRepository chapterRepository) {
        this.imgChapterRepository = imgChapterRepository;
        this.chapterRepository = chapterRepository;
    }

    public List<ImgChapter> createImgChapters(List<ImgChapterRequest> requests) {
        if (requests.isEmpty()) {
            return new ArrayList<>();
        }
        final Long commonChapterId = requests.get(0).getChapterId();

        boolean allSameId = requests.stream()
                .allMatch(req -> Objects.equals(commonChapterId, req.getChapterId()));

        if (!allSameId) {
            throw new RuntimeException("Bulk image insert requires all images to share the same Chapter ID.");
        }
        if (commonChapterId == null) {
            throw new RuntimeException("Chapter ID cannot be null.");
        }
        chapterRepository.findById(commonChapterId)
                .orElseThrow(() -> new RuntimeException("Chapter Not Found"));

        List<ImgChapter> entities = new ArrayList<>();
        for (ImgChapterRequest request : requests) {
            ImgChapter imgChapter = new ImgChapter(
                    request.getChapterId(),
                    request.getStt(),
                    request.getImgLink()
            );
            entities.add(imgChapter);
        }

        return imgChapterRepository.saveAll(entities);
    }

    public ImgChapter getImgChapterById(Long id) {
        return imgChapterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image chapter not found with id: " + id));
    }

    public List<ImgChapter> getAllImgChapters() {
        return imgChapterRepository.findAll();
    }

    public List<ImgChapter> getImgsByChapterId(Long chapterId) {
        return imgChapterRepository.findByChapterId(chapterId);
    }

    public ImgChapter updateImgChapter(Long id, ImgChapterRequest request) {
        ImgChapter existing = imgChapterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image chapter not found with id: " + id));

        if (request.getChapterId() != null) {
            chapterRepository.findById(request.getChapterId())
                    .orElseThrow(() -> new RuntimeException("Chapter Not Found"));
        }

        existing.setChapterId(request.getChapterId());
        existing.setStt(request.getStt());
        existing.setImgLink(request.getImgLink());

        return imgChapterRepository.update(existing);
    }

    public void deleteImgChapter(Long id) {
        if (imgChapterRepository.findById(id).isEmpty()) {
            throw new RuntimeException("Image chapter not found with id: " + id);
        }
        imgChapterRepository.deleteById(id);
    }
}