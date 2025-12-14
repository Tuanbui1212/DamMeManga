package org.example.backend.domain.repository;

import org.example.backend.domain.model.Category;
import org.example.backend.infrastructure.dto.CategoryDTO;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository {

    List<CategoryDTO> getAllCategories();

    Optional<Category> getCategoryById(String id);

    Category createCategory(Category category);

    Category updateCategory(String id, Category category);

    void deleteCategory(String id);
}
