package org.example.backend.domain.repository;

import org.example.backend.domain.model.MangaDetail;

import java.util.List;
import java.util.Optional;

public interface MangaDetailRepository {
    List<MangaDetail> findAll();
    Optional<MangaDetail> findById(String id);
}
