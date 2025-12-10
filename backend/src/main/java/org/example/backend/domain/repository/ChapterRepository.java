package org.example.backend.domain.repository;

import org.example.backend.domain.model.Chapter;
import org.example.backend.infrastructure.dto.ChapterDTO;

import java.util.List;
import java.util.Optional;

public interface ChapterRepository {
    Chapter save(Chapter chapter);

    List<Chapter> findAll();

    Optional<Chapter> findById(Long id);

    Chapter update(Chapter chapter);

    void deleteById(Long id);

    List<ChapterDTO> getChaptersByMangaId(String mangaId);

}