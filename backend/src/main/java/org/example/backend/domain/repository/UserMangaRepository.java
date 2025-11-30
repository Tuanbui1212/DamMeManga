package org.example.backend.domain.repository;

import org.example.backend.domain.model.Manga;

import java.util.List;
import java.util.Optional;

public interface UserMangaRepository {
    List<Manga> findAll();
    Optional<Manga> findById(String id);
}
