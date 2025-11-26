package org.example.backend.domain.repository;

import org.example.backend.domain.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, String> {
    // Bạn có thể thêm các query custom nếu cần
}
