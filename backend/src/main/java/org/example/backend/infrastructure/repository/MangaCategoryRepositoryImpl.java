package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.MangaCategory;
import org.example.backend.domain.repository.MangaCategoryRepository;
import org.example.backend.infrastructure.repository.jpa.MangaCategoryJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MangaCategoryRepositoryImpl implements MangaCategoryRepository {

    private final MangaCategoryJpaRepository jpaRepository;

    public MangaCategoryRepositoryImpl(MangaCategoryJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

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
