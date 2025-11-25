package org.example.backend.infrastructure.repository;

import org.example.backend.infrastructure.entity.MangaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaJpaRepository extends JpaRepository<MangaEntity, String> {
}
