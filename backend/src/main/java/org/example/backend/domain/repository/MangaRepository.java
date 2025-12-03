package org.example.backend.domain.repository;

import org.example.backend.domain.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MangaRepository extends JpaRepository<Manga, String> {

    @Query("""
            SELECT m
            FROM MangaCategory mc
            JOIN mc.manga m
            JOIN mc.category c
            WHERE c.nameCategory IN :categoryNames
            GROUP BY m
            HAVING COUNT(DISTINCT c.idCategory) = :categoryCount
            """)
    List<Manga> findMangaByAllCategoryNames(
            @Param("categoryNames") List<String> categoryNames,
            @Param("categoryCount") long categoryCount
    );
}
