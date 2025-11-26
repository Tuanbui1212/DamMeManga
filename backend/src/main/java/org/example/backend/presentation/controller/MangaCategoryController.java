// package org.example.backend.presentation.controller;

// import org.example.backend.presentation.dto.MangaCategoryCreateDTO;
// import org.example.backend.presentation.dto.MangaWithCategoriesDTO;
// import org.example.backend.usecase.MangaCategoryService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/manga-category")
// @CrossOrigin(origins = "*")
// public class MangaCategoryController {

//     private final MangaCategoryService mangaCategoryService;

//     public MangaCategoryController(MangaCategoryService mangaCategoryService) {
//         this.mangaCategoryService = mangaCategoryService;
//     }

//     @GetMapping("/list")
//     public List<MangaWithCategoriesDTO> getAll() {
//         return mangaCategoryService.getAllMangaWithCategories();
//     }

//     @PostMapping("/add")
//     public String addCategoryToManga(@RequestBody MangaCategoryCreateDTO dto) {
//         mangaCategoryService.addCategoryToManga(dto.getMangaId(), dto.getCategoryId());
//         return "Added category to manga successfully";
//     }

// }
