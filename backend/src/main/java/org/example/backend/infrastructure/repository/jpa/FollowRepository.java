// // src/main/java/org/example/backend/domain/repository/FollowRepository.java
// package org.example.backend.infrastructure.repository.jpa;

// import org.example.backend.domain.model.Follow;
// import org.example.backend.infrastructure.dto.FollowDTO;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

// import java.util.List;

// public interface FollowRepository extends JpaRepository<Follow, String> {

//     boolean existsByUserIdAndMangaId(String userId, String mangaId);

//     // Lấy list FollowDTO cho 1 user, tránh trả toàn bộ entity
//     @Query("SELECT new org.example.backend.application.dto.FollowDTO(f.id, f.mangaId) " +
//             "FROM Follow f WHERE f.userId = :userId")
//     List<FollowDTO> findAllByUserIdAsDTO(String userId);
// }
