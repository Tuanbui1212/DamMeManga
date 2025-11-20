package org.example.backend.infrastructure.repository;

import org.example.backend.infrastructure.entity.MangaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangaRepositoryImpl extends JpaRepository<MangaEntity, String> {
}
