package org.example.backend.domain.repository;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;
import java.util.List;
import java.util.Optional;

public interface MangaRepository {

    Manga save(Manga manga);

    Optional<Manga> findById(String id);

    void deleteById(String id);

    List<Manga> findAll();

    List<MangaDTO> findAllDTO();

    org.springframework.data.domain.Page<MangaDTO> findMangasPaged(String query, String category, String status, org.springframework.data.domain.Pageable pageable);

    List<MangaDTO> findTopMangas(int limit);

    List<MangaDTO> findLatestMangas(int limit);

    List<MangaDTO> search(String query, int limit);

    List<Manga> findAllWithChapters();

    Optional<Manga> findByIdWithChapters(String id);

    List<Manga> findMangaByAllCategoryNames(List<String> categoryNames, long categoryCount);

    long countMangas();

    long countTotalViews();

    void increaseView(String id);
}
