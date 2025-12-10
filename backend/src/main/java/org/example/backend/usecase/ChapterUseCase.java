package org.example.backend.usecase;

import org.example.backend.domain.model.Chapter;
import org.example.backend.domain.model.MangaDetail;
import org.example.backend.domain.repository.ChapterRepository;
import org.example.backend.domain.repository.MangaDetailRepository;
import org.example.backend.infrastructure.dto.ChapterDTO;
import org.example.backend.infrastructure.dto.ChapterRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChapterUseCase {

    private final ChapterRepository chapterRepository;
    private final MangaDetailRepository mangaRepository;

    public ChapterUseCase(ChapterRepository chapterRepository,
                          MangaDetailRepository mangaRepository) {
        this.chapterRepository = chapterRepository;
        this.mangaRepository = mangaRepository;
    }

    public Chapter createChapter(ChapterRequest request) {
        MangaDetail manga = mangaRepository.findById(request.getIdManga())
                .orElseThrow(() -> new RuntimeException("Manga not found"));
        Chapter chapter = new Chapter(manga, request.getChapterNumber(), request.getTitle());

        Chapter savedChapter = chapterRepository.save(chapter);
        manga.setUpdatedAt(LocalDateTime.now());
        mangaRepository.save(manga);

        return chapterRepository.save(chapter);
    }



    public List<Chapter> getAllChapters() {
        return chapterRepository.findAll();
    }

    public Chapter getChapterById(Long id) {
        return chapterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chapter not found with id: " + id));
    }

    public Chapter updateChapter(Long id, ChapterRequest request) {
        Chapter existing = chapterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chapter not found with id: " + id));
        MangaDetail newManga = null;
        if (request.getIdManga() != null) {
            newManga = mangaRepository.findById(request.getIdManga())
                    .orElseThrow(() -> new RuntimeException("Manga not found with id: " + request.getIdManga()));
        }
        existing.setManga(newManga);
        existing.setChapterNumber(request.getChapterNumber());
        existing.setTitle(request.getTitle());
        return chapterRepository.update(existing);
    }

    public void deleteChapter(Long id) {
        Chapter existing = getChapterById(id);
        chapterRepository.deleteById(id);
    }

    public List<ChapterDTO> getChaptersByMangaId(String mangaId) {
        return chapterRepository.getChaptersByMangaId(mangaId);
    }
}
