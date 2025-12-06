package org.example.backend.domain.repository;

import org.example.backend.domain.model.ImgChapter;
import java.util.List;
import java.util.Optional;

public interface ImgChapterRepository {
    List<ImgChapter> saveAll(Iterable<ImgChapter> imgChapters);
    List<ImgChapter> findAll();
    Optional<ImgChapter> findById(Long id);
    ImgChapter update(ImgChapter imgChapter);
    void deleteById(Long id);
    List<ImgChapter> findByChapterId(Long chapterId);
}