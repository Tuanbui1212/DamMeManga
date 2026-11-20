package org.example.backend.infrastructure.repository;

import jakarta.transaction.Transactional;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM Manga m LEFT JOIN m.author a
            """)
    List<MangaDTO> findAllDTO();

    @Query(value = """
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM Manga m LEFT JOIN m.author a
            WHERE (:query IS NULL OR :query = '' OR LOWER(m.nameManga) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(COALESCE(a.nameAuthor, '')) LIKE LOWER(CONCAT('%', :query, '%')))
              AND (:status IS NULL OR :status = '' OR :status = 'Tất cả' OR m.status = :status)
            """,
            countQuery = """
            SELECT COUNT(m)
            FROM Manga m LEFT JOIN m.author a
            WHERE (:query IS NULL OR :query = '' OR LOWER(m.nameManga) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(COALESCE(a.nameAuthor, '')) LIKE LOWER(CONCAT('%', :query, '%')))
              AND (:status IS NULL OR :status = '' OR :status = 'Tất cả' OR m.status = :status)
            """)
    Page<MangaDTO> findMangasPaged(
            @Param("query") String query,
            @Param("status") String status,
            Pageable pageable);

    @Query(value = """
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM MangaCategory mc
            JOIN mc.manga m
            JOIN mc.category c
            LEFT JOIN m.author a
            WHERE c.nameCategory = :category
              AND (:query IS NULL OR :query = '' OR LOWER(m.nameManga) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(COALESCE(a.nameAuthor, '')) LIKE LOWER(CONCAT('%', :query, '%')))
              AND (:status IS NULL OR :status = '' OR :status = 'Tất cả' OR m.status = :status)
            """,
            countQuery = """
            SELECT COUNT(mc)
            FROM MangaCategory mc
            JOIN mc.manga m
            JOIN mc.category c
            LEFT JOIN m.author a
            WHERE c.nameCategory = :category
              AND (:query IS NULL OR :query = '' OR LOWER(m.nameManga) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(COALESCE(a.nameAuthor, '')) LIKE LOWER(CONCAT('%', :query, '%')))
              AND (:status IS NULL OR :status = '' OR :status = 'Tất cả' OR m.status = :status)
            """)
    Page<MangaDTO> findMangasByCategoryPaged(
            @Param("category") String category,
            @Param("query") String query,
            @Param("status") String status,
            Pageable pageable);

    @Query("""
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM Manga m LEFT JOIN m.author a
            ORDER BY m.countView DESC
            """)
    List<MangaDTO> findTopMangas(Pageable pageable);

    @Query("""
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM Manga m LEFT JOIN m.author a
            ORDER BY m.updateAt DESC
            """)
    List<MangaDTO> findLatestMangas(Pageable pageable);

    @Query("""
            SELECT new org.example.backend.infrastructure.dto.MangaDTO(
                m.idManga, m.nameManga, COALESCE(a.nameAuthor, 'Unknown'),
                m.description, m.bannerUrl, m.posterUrl,
                m.status, COALESCE(m.countView, 0), m.createAt, m.updateAt
            )
            FROM Manga m LEFT JOIN m.author a
            WHERE LOWER(m.nameManga) LIKE LOWER(CONCAT('%', :query, '%'))
               OR LOWER(COALESCE(a.nameAuthor, '')) LIKE LOWER(CONCAT('%', :query, '%'))
            ORDER BY m.countView DESC
            """)
    List<MangaDTO> searchMangas(@Param("query") String query, Pageable pageable);

    @Query("""
            SELECT DISTINCT m
            FROM Manga m
            LEFT JOIN FETCH m.author
            LEFT JOIN FETCH m.chapters
            """)
    List<Manga> findAllWithChapters();

    @Query("""
            SELECT m
            FROM Manga m
            LEFT JOIN FETCH m.author
            LEFT JOIN FETCH m.chapters
            WHERE m.idManga = :id
            """)
    Optional<Manga> findByIdWithChapters(@Param("id") String id);

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

    @Query("SELECT COALESCE(SUM(m.countView), 0) FROM Manga m")
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
    public Page<MangaDTO> findMangasPaged(String query, String category, String status, Pageable pageable) {
        String trimmedQuery = (query != null && !query.isBlank()) ? query.trim() : null;
        String trimmedStatus = (status != null && !status.isBlank() && !"Tất cả".equalsIgnoreCase(status)) ? status.trim() : null;
        if (category != null && !category.isBlank() && !"Tất cả".equalsIgnoreCase(category)) {
            return jpaMangaRepository.findMangasByCategoryPaged(category.trim(), trimmedQuery, trimmedStatus, pageable);
        }
        return jpaMangaRepository.findMangasPaged(trimmedQuery, trimmedStatus, pageable);
    }

    @Override
    public List<MangaDTO> findTopMangas(int limit) {
        return jpaMangaRepository.findTopMangas(PageRequest.of(0, Math.max(1, limit)));
    }

    @Override
    public List<MangaDTO> findLatestMangas(int limit) {
        return jpaMangaRepository.findLatestMangas(PageRequest.of(0, Math.max(1, limit)));
    }

    @Override
    public List<MangaDTO> search(String query, int limit) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        return jpaMangaRepository.searchMangas(query.trim(), PageRequest.of(0, Math.max(1, limit)));
    }

    @Override
    public List<Manga> findAllWithChapters() {
        return jpaMangaRepository.findAllWithChapters();
    }

    @Override
    public Optional<Manga> findByIdWithChapters(String id) {
        return jpaMangaRepository.findByIdWithChapters(id);
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
