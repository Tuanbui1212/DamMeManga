package org.example.backend.domain.repository;

import org.example.backend.domain.model.Chapter;
import java.util.List;
import java.util.Optional;

public interface ChapterRepository {
    Chapter save(Chapter chapter);
    List<Chapter> findAll();
    Optional<Chapter> findById(String id);
    Chapter update(Chapter chapter);
    void deleteById(String id);
    List<Chapter> getChaptersByMangaId(String mangaId);
}
