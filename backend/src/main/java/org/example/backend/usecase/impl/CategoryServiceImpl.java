package org.example.backend.usecase.impl;

import org.example.backend.domain.model.Category;
import org.example.backend.domain.repository.CategoryRepository;
import org.example.backend.usecase.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        if (category.getIdCategory() == null || category.getIdCategory().isEmpty()) {
            category.setIdCategory(UUID.randomUUID().toString());
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(String id, Category category) {
        return categoryRepository.findById(id)
                .map(existing -> {
                    existing.setNameCategory(category.getNameCategory());
                    existing.setDescription(category.getDescription());
                    return categoryRepository.save(existing);
                })
                .orElse(null);
    }

    @Override
    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }
}
