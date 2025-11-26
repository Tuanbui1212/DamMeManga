package org.example.backend.infrastructure.repository;

import org.example.backend.infrastructure.entity.MangaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

@Repository
public interface MangaJpaRepository extends JpaRepository<MangaEntity, String> {
=======

public interface MangaRepositoryImpl extends JpaRepository<MangaEntity, String> {
>>>>>>> java/phungcuong
}
