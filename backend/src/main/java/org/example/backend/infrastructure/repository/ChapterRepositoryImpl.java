package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Chapter;
import org.example.backend.domain.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaChapterRepository extends JpaRepository<Chapter, Long> {

    @Query("""
    SELECT c FROM Chapter c 
    JOIN FETCH c.manga 
    WHERE c.manga.idManga = ?1
    """)
    List<Chapter> getChaptersByMangaId(String mangaId);
}

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
    public Optional<Chapter> findById(Long id) {
        return jpaChapterRepository.findById(id);
    }

    @Override
    public Chapter update(Chapter chapter) {
        return jpaChapterRepository.save(chapter);
    }

    @Override
    public void deleteById(Long id) {
        jpaChapterRepository.deleteById(id);
    }

    @Override
    public List<Chapter> getChaptersByMangaId(String mangaId) {
        return jpaChapterRepository.getChaptersByMangaId(mangaId);
    }
}
