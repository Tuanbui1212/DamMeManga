// package org.example.backend.infrastructure.repository.jpa;

// import org.example.backend.domain.model.Chapter;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.util.List;

// public interface JpaChapterRepository extends JpaRepository<Chapter, String> {

//     @Query("""
//                 SELECT c FROM Chapter c
//                 JOIN FETCH c.manga
//                 WHERE c.manga.idManga = :mangaId
//             """)
//     List<Chapter> getChaptersByMangaId(@Param("mangaId") String mangaId);


//     @Query("""
//                 SELECT COUNT(c)
//                 FROM Chapter c
//                 WHERE c.manga.idManga = :mangaId
//             """)
//     long countByMangaId(String mangaId);

// }
