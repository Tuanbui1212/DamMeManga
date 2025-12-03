package org.example.backend.infrastructure.repository.jpa;

import org.example.backend.domain.model.MangaCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangaCategoryJpaRepository extends JpaRepository<MangaCategory, String> {
    long countByCategory_NameCategory(String nameCategory);
    long countByCategory_IdCategory(String idCategory);
}
