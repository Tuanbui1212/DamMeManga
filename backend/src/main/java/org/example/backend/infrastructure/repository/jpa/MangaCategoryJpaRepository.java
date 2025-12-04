package org.example.backend.infrastructure.repository.jpa;

import org.example.backend.domain.model.MangaCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MangaCategoryJpaRepository extends JpaRepository<MangaCategory, String> {

    long countByCategory_NameCategory(String nameCategory);

    long countByCategory_IdCategory(String idCategory);

    @Query("SELECT mc FROM MangaCategory mc " +
            "JOIN FETCH mc.manga " +
            "JOIN FETCH mc.category " +
            "WHERE mc.manga.idManga = :idManga")
    List<MangaCategory> findByMangaIdWithCategory(@Param("idManga") String idManga);

}
