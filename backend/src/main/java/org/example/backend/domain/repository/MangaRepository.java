package org.example.backend.domain.repository;

import org.example.backend.domain.model.Manga;

import java.util.List;
import java.util.Optional;

public interface MangaRepository {
    Optional<Manga> findById(String id);
    List<Manga> findAll();
    Manga save(Manga manga);
    void deleteById(String id);
}