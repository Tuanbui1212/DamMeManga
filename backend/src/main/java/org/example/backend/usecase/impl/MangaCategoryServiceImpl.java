// package org.example.backend.usecase.impl;

// import org.example.backend.presentation.dto.MangaWithCategoriesDTO;
// import org.example.backend.domain.model.Manga;
// import org.example.backend.domain.model.Category;
// import org.example.backend.domain.model.MangaCategory;
// import org.example.backend.domain.repository.MangaCategoryRepository;
// import org.example.backend.domain.repository.MangaRepository;
// import org.example.backend.domain.repository.CategoryRepository;
// import org.example.backend.usecase.MangaCategoryService;
// import org.springframework.stereotype.Service;

// import java.util.*;
// import java.util.stream.Collectors;

// @Service
// public class MangaCategoryServiceImpl implements MangaCategoryService {

//     private final MangaCategoryRepository mangaCategoryRepository;
//     private final MangaRepository mangaRepository;
//     private final CategoryRepository categoryRepository;

//     public MangaCategoryServiceImpl(
//             MangaCategoryRepository mangaCategoryRepository,
//             MangaRepository mangaRepository,
//             CategoryRepository categoryRepository) {
//         this.mangaCategoryRepository = mangaCategoryRepository;
//         this.mangaRepository = mangaRepository;
//         this.categoryRepository = categoryRepository;
//     }

//     @Override
//     public List<MangaWithCategoriesDTO> getAllMangaWithCategories() {
//         List<MangaCategory> list = mangaCategoryRepository.findAll();

//         // Gom theo Manga
//         Map<String, List<MangaCategory>> grouped = list.stream()
//                 .collect(Collectors.groupingBy(mc -> mc.getManga().getIdManga()));

//         List<MangaWithCategoriesDTO> result = new ArrayList<>();

//         grouped.forEach((mangaId, mangaCategories) -> {
//             String mangaName = mangaCategories.get(0).getManga().getNameManga();

//             List<String> categoryNames = mangaCategories.stream()
//                     .map(mc -> mc.getCategory().getNameCategory())
//                     .collect(Collectors.toList());

//             result.add(new MangaWithCategoriesDTO(
//                     mangaId,
//                     mangaName,
//                     categoryNames));
//         });

//         return result;
//     }

//     @Override
//     public void addCategoryToManga(String mangaId, String categoryId) {
//         Manga manga = mangaRepository.findById(mangaId)
//                 .orElseThrow(() -> new RuntimeException("Manga not found"));

//         Category category = categoryRepository.findById(categoryId)
//                 .orElseThrow(() -> new RuntimeException("Category not found"));

//         // Kiểm tra tồn tại
//         Optional<MangaCategory> existing = mangaCategoryRepository
//                 .findAll()
//                 .stream()
//                 .filter(mc -> mc.getManga().getIdManga().equals(mangaId)
//                         && mc.getCategory().getIdCategory().equals(categoryId))
//                 .findFirst();

//         if (existing.isPresent()) {
//             throw new RuntimeException("This manga already has this category");
//         }

//         MangaCategory mangaCategory = new MangaCategory(
//                 UUID.randomUUID().toString(),
//                 manga,
//                 category);

//         mangaCategoryRepository.save(mangaCategory);
//     }
// }
