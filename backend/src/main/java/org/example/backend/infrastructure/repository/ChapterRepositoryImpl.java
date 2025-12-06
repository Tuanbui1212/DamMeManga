package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Chapter;
import org.example.backend.domain.repository.ChapterRepository;
import org.example.backend.infrastructure.repository.jpa.JpaChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ChapterRepositoryImpl implements ChapterRepository {

    @Autowired
    private JpaChapterRepository jpaChapterRepository;

    @Override
    public Chapter save(Chapter chapter) {
        return jpaChapterRepository.save(chapter);
    }

    @Override
    public List<Chapter> findAll() {
        return jpaChapterRepository.findAll();
    }

    @Override
    public Optional<Chapter> findById(String id) {
        return jpaChapterRepository.findById(id);
    }

    @Override
    public Chapter update(Chapter chapter) {
        return jpaChapterRepository.save(chapter);
    }

    @Override
    public void deleteById(String id) {
        jpaChapterRepository.deleteById(id);
    }

    @Override
    public List<Chapter> getChaptersByMangaId(String mangaId) {
        return jpaChapterRepository.getChaptersByMangaId(mangaId);
    }

    @Override
    public long countChaptersByMangaId(String mangaId) {
        return jpaChapterRepository.countByMangaId(mangaId);
    }

}
