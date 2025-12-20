package org.example.backend.usecase;

import org.example.backend.domain.model.Category;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.model.MangaCategory;
import org.example.backend.domain.repository.CategoryRepository;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.domain.repository.MangaCategoryRepository;
import org.example.backend.infrastructure.dto.MangaCategoryDTO;
import org.example.backend.infrastructure.dto.MangaCategoryRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MangaCategoryUseCase {

    private final MangaCategoryRepository mangaCategoryRepository;
    private final MangaRepository mangaRepository;
    private final CategoryRepository categoryRepository;

    public MangaCategoryUseCase(
            MangaCategoryRepository mangaCategoryRepository,
            MangaRepository mangaRepository,
            CategoryRepository categoryRepository) {
        this.mangaCategoryRepository = mangaCategoryRepository;
        this.mangaRepository = mangaRepository;
        this.categoryRepository = categoryRepository;
    }

    private MangaCategoryDTO toDTO(MangaCategory mc) {
        return new MangaCategoryDTO(
                mc.getId(),
                mc.getManga().getNameManga(),
                mc.getCategory().getNameCategory());
    }

    public List<MangaCategoryDTO> getAll() {
        return mangaCategoryRepository.getAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public MangaCategoryDTO getById(String id) {
        return mangaCategoryRepository.getById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public MangaCategoryDTO create(MangaCategoryRequest request) {

        Manga manga = mangaRepository.findById(request.getIdManga())
                .orElseThrow(() -> new RuntimeException("Manga not found"));

        Category category = categoryRepository.getCategoryById(request.getIdCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        MangaCategory entity = new MangaCategory();
        entity.setId(UUID.randomUUID().toString());
        entity.setManga(manga);
        entity.setCategory(category);

        return toDTO(mangaCategoryRepository.create(entity));
    }

    public MangaCategoryDTO update(String id, MangaCategoryRequest request) {

        Manga manga = mangaRepository.findById(request.getIdManga())
                .orElseThrow(() -> new RuntimeException("Manga not found"));

        Category category = categoryRepository.getCategoryById(request.getIdCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        MangaCategory entity = new MangaCategory();
        entity.setId(id);
        entity.setManga(manga);
        entity.setCategory(category);

        return toDTO(mangaCategoryRepository.update(entity));
    }

    public void delete(String id) {
        mangaCategoryRepository.delete(id);
    }

    public List<MangaCategoryDTO> getCategoriesByMangaId(String idManga) {
        List<MangaCategory> existing = mangaCategoryRepository.findByMangaIdWithCategory(idManga);
        return existing.stream()
                .map(this::toDTO)
                .toList();
    }

    public MangaCategoryDTO getCategoryById(String idCategory) {
        return mangaCategoryRepository.getById(idCategory)
                .map(this::toDTO)
                .orElse(null);
    }

    public void syncCategoriesForManga(String idManga, List<String> categoryIds) {
        Manga manga = mangaRepository.findById(idManga)
                .orElseThrow(() -> new RuntimeException("Manga not found"));

        List<MangaCategory> existing = mangaCategoryRepository.findByMangaIdWithCategory(idManga);

        List<String> existingCategoryIds = existing.stream()
                .map(mc -> mc.getCategory().getIdCategory())
                .toList();

        List<String> toAdd = categoryIds.stream()
                .filter(id -> !existingCategoryIds.contains(id))
                .toList();

        List<MangaCategory> toDelete = existing.stream()
                .filter(mc -> !categoryIds.contains(mc.getCategory().getIdCategory()))
                .toList();

        toDelete.forEach(mc -> mangaCategoryRepository.delete(mc.getId()));

        List<MangaCategory> toSave = buildCategoriesToSave(manga, toAdd);
        if (!toSave.isEmpty()) {
            mangaCategoryRepository.addCategoriesToManga(toSave);
        }
    }

    public long countMangaByCategoryName(String nameCategory) {
        return mangaCategoryRepository.countMangaByCategoryName(nameCategory);
    }

    private List<MangaCategory> buildCategoriesToSave(Manga manga, List<String> toAddIds) {
        return toAddIds.stream().map(idCat -> {
            Category category = categoryRepository.getCategoryById(idCat)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            MangaCategory mc = new MangaCategory();
            mc.setId(UUID.randomUUID().toString());
            mc.setManga(manga);
            mc.setCategory(category);
            return mc;
        }).toList();
    }
}
