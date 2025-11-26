package org.example.backend.domain.repository;

import org.example.backend.domain.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangaRepository extends JpaRepository<Manga, String> {
}
