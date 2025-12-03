package org.example.backend.usecase;

import org.example.backend.domain.model.Chapter;
import org.example.backend.domain.repository.ChapterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChapterUseCase {

    private final ChapterRepository chapterRepository;

    public ChapterUseCase(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    // Tạo chapter mới
    public Chapter createChapter(Chapter chapter) {
        return chapterRepository.save(chapter);
    }

    // Lấy danh sách tất cả chapter
    public List<Chapter> getAllChapters() {
        return chapterRepository.findAll();
    }

    // Lấy chapter theo ID
    public Optional<Chapter> getChapterById(String id) {
        return chapterRepository.findById(id);
    }

    // Cập nhật chapter
    public Chapter updateChapter(String id, Chapter chapter) {
        return chapterRepository.findById(id)
                .map(existing -> {
                    existing.setManga(chapter.getManga());
                    existing.setChapterNumber(chapter.getChapterNumber());
                    existing.setTitle(chapter.getTitle());
                    return chapterRepository.update(existing);
                }).orElseThrow(() -> new RuntimeException("Chapter not found with id: " + id));
    }

    // Xóa chapter theo ID
    public void deleteChapter(String id) {
        chapterRepository.deleteById(id);
    }

    //Lay Chaptẻr của manga
    public List<Chapter> getChaptersByMangaId(String mangaId) {
        return chapterRepository.getChaptersByMangaId(mangaId);
    }
}
