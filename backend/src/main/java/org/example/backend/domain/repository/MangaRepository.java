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

    List<Manga> findMangaByAllCategoryNames(List<String> categoryNames, long categoryCount);
}
