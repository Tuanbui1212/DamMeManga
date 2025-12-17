package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Category;
import org.example.backend.domain.repository.CategoryRepository;
import org.example.backend.infrastructure.dto.CategoryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

interface CategoryJpaRepository extends JpaRepository<Category, String> {
    @Query("SELECT new org.example.backend.infrastructure.dto.CategoryDTO(" +
            "c.idCategory, c.nameCategory, c.description, COUNT(mc)) " +
            "FROM Category c LEFT JOIN MangaCategory mc ON mc.category.idCategory = c.idCategory " +
            "GROUP BY c.idCategory, c.nameCategory, c.description")
    List<CategoryDTO> findAllWithMangaCount();

    @Query("SELECT COUNT(c) FROM Category c")
    long countCategories();
}

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {

    private final CategoryJpaRepository jpa;

    public CategoryRepositoryImpl(CategoryJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return jpa.findAllWithMangaCount();
    }

    @Override
    public Optional<Category> getCategoryById(String id) {
        return jpa.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        if (category.getIdCategory() == null || category.getIdCategory().isEmpty()) {
            category.setIdCategory(UUID.randomUUID().toString());
        }
        return jpa.save(category);
    }

    @Override
    public Category updateCategory(String id, Category category) {
        return jpa.findById(id)
                .map(existing -> {
                    existing.setNameCategory(category.getNameCategory());
                    existing.setDescription(category.getDescription());
                    return jpa.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Category không tồn tại"));
    }

    @Override
    public void deleteCategory(String id) {
        if (!jpa.existsById(id)) {
            throw new RuntimeException("Category không tồn tại");
        }
        jpa.deleteById(id);
    }

    @Override
    public long countCategories() {
        return jpa.countCategories();
    }
}