package org.example.backend.infrastructure.repository.jpa;

import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.domain.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MangaJpaRepository extends JpaRepository<Manga, String> {

        @Query("SELECT new org.example.backend.infrastructure.dto.MangaDTO(" +
                        "m.idManga, m.nameManga, a.nameAuthor, m.description, m.bannerUrl, m.posterUrl, " +
                        "m.status, m.countView, m.createAt, m.updateAt) " +
                        "FROM Manga m JOIN m.author a")
        List<MangaDTO> findAllDTO();

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
                        @Param("categoryCount") long categoryCount);
}
