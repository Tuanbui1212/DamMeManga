package org.example.backend.domain.repository;

import org.example.backend.domain.model.MangaCategory;

import java.util.List;
import java.util.Optional;

public interface MangaCategoryRepository {

    List<MangaCategory> getAll();

    Optional<MangaCategory> getById(String id);

    MangaCategory create(MangaCategory mangaCategory);

    MangaCategory update(MangaCategory mangaCategory);

    Optional<MangaCategory> getCategoryById(String idCategory);

    void addCategoriesToManga(List<MangaCategory> mangaCategories);

    void delete(String id);

    void syncCategoriesForManga(String idManga, List<String> categoryIds);
}
