package org.example.backend.infrastructure.repository;

import jakarta.transaction.Transactional;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaMangaRepository extends JpaRepository<Manga, String> {

    @Query("""
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, a.nameAuthor,
                m.description, m.bannerUrl, m.posterUrl,
                m.status, m.countView, m.createAt, m.updateAt
            )
            FROM Manga m JOIN m.author a
            """)
    List<MangaDTO> findAllDTO();

    @Query("""
            SELECT m
            FROM MangaCategory mc
            JOIN mc.manga m
            JOIN mc.category c
            JOIN FETCH m.author
            WHERE c.nameCategory IN :categoryNames
            GROUP BY m
            HAVING COUNT(DISTINCT c.idCategory) = :categoryCount
            """)
    List<Manga> findMangaByAllCategoryNames(
            @Param("categoryNames") List<String> categoryNames,
            @Param("categoryCount") long categoryCount);

    @Query("SELECT COUNT(m) FROM Manga m")
    long countMangas();

    @Query("SELECT SUM(m.countView) FROM Manga m")
    long countTotalViews();

    @Modifying
    @Transactional
    @Query("UPDATE Manga m SET m.countView = COALESCE(m.countView, 0) + 1 WHERE m.idManga = :id")
    void increaseView(@Param("id") String id);
}

@Repository
public class MangaRepositoryImpl implements MangaRepository {

    @Autowired
    private JpaMangaRepository jpaMangaRepository;

    @Override
    public Manga save(Manga manga) {
        return jpaMangaRepository.save(manga);
    }

    @Override
    public Optional<Manga> findById(String id) {
        return jpaMangaRepository.findById(id);
    }

    @Override
    public void deleteById(String id) {
        jpaMangaRepository.deleteById(id);
    }

    @Override
    public List<Manga> findAll() {
        return jpaMangaRepository.findAll();
    }

    @Override
    public List<MangaDTO> findAllDTO() {
        return jpaMangaRepository.findAllDTO();
    }

    @Override
    public List<Manga> findMangaByAllCategoryNames(List<String> categoryNames, long categoryCount) {
        return jpaMangaRepository.findMangaByAllCategoryNames(categoryNames, categoryCount);
    }

    @Override
    public long countMangas() {
        return jpaMangaRepository.countMangas();
    }

    @Override
    public long countTotalViews() {
        return jpaMangaRepository.countTotalViews();
    }

    @Override
    public void increaseView(String id) {
        jpaMangaRepository.increaseView(id);
    }
}
