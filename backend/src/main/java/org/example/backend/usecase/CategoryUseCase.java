package org.example.backend.usecase;

import org.example.backend.domain.model.Category;
import org.example.backend.domain.repository.CategoryRepository;
import org.example.backend.infrastructure.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryUseCase {

    private final CategoryRepository categoryRepository;

    public CategoryUseCase(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.getAllCategories();
    }

    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.getCategoryById(id);
    }

    public Category createCategory(Category category) {
        return categoryRepository.createCategory(category);
    }

    public Category updateCategory(String id, Category category) {
        return categoryRepository.updateCategory(id, category);
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteCategory(id);
    }
}
