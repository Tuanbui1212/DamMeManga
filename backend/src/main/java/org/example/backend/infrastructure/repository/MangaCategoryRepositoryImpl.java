package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.MangaCategory;
import org.example.backend.domain.repository.MangaCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaMangaCategoryRepository extends JpaRepository<MangaCategory, String> {

    long countByCategory_NameCategory(String nameCategory);

    long countByCategory_IdCategory(String idCategory);

    @Query("""
        SELECT mc FROM MangaCategory mc
        JOIN FETCH mc.manga
        JOIN FETCH mc.category
        WHERE mc.manga.idManga = :idManga
        """)
    List<MangaCategory> findByMangaIdWithCategory(@Param("idManga") String idManga);
}


@Repository
public class MangaCategoryRepositoryImpl implements MangaCategoryRepository {

    @Autowired
    private JpaMangaCategoryRepository jpaRepository;

    @Override
    public List<MangaCategory> getAll() {
        return jpaRepository.findAll();
    }

    @Override
    public Optional<MangaCategory> getById(String id) {
        return jpaRepository.findById(id);
    }

    @Override
    public MangaCategory create(MangaCategory mangaCategory) {
        return jpaRepository.save(mangaCategory);
    }

    @Override
    public MangaCategory update(MangaCategory mangaCategory) {
        return jpaRepository.save(mangaCategory);
    }

    @Override
    public void addCategoriesToManga(List<MangaCategory> mangaCategories) {
        jpaRepository.saveAll(mangaCategories);
    }

    @Override
    public void delete(String id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public void syncCategoriesForManga(String idManga, List<String> categoryIds) {
        // Bạn chưa implement → để nguyên
    }

    @Override
    public Optional<MangaCategory> getCategoryById(String idCategory) {
        return jpaRepository.findById(idCategory);
    }

    @Override
    public long countMangaByCategoryName(String nameCategory) {
        return jpaRepository.countByCategory_NameCategory(nameCategory);
    }

    @Override
    public long countMangaByCategoryId(String idCategory) {
        return jpaRepository.countByCategory_IdCategory(idCategory);
    }

    @Override
    public List<MangaCategory> findByMangaIdWithCategory(String idManga) {
        return jpaRepository.findByMangaIdWithCategory(idManga);
    }
}
