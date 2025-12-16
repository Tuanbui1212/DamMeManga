package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Follow;
import org.example.backend.domain.repository.FollowRepository;
import org.example.backend.infrastructure.dto.FollowDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface FollowRepositoryJpa extends JpaRepository<Follow, String> {

    @Query("""
                SELECT new org.example.backend.infrastructure.dto.FollowDTO(
                    f.id,
                    m.idManga,
                    m.nameManga,
                    m.posterUrl,
                    COUNT(c.idChapter),
                    m.updateAt
                )
                FROM Follow f
                JOIN Manga m ON m.idManga = f.mangaId
                LEFT JOIN Chapter c ON c.manga.idManga = m.idManga
                WHERE f.userId = :userId
                GROUP BY
                    f.id,
                    m.idManga,
                    m.nameManga,
                    m.posterUrl,
                    m.updateAt
                ORDER BY m.updateAt DESC
            """)
    List<FollowDTO> findFollowingDTOByUserId(@Param("userId") String userId);

}

@Repository
public class FollowRepositoryImpl implements FollowRepository {

    private final FollowRepositoryJpa followJpaRepository;

    public FollowRepositoryImpl(FollowRepositoryJpa followJpaRepository) {
        this.followJpaRepository = followJpaRepository;
    }

    @Override
    public Follow save(Follow follow) {
        return followJpaRepository.save(follow);
    }

    @Override
    public Optional<Follow> findById(String id) {
        return followJpaRepository.findById(id);
    }

    @Override
    public void deleteById(String id) {
        followJpaRepository.deleteById(id);
    }

    @Override
    public List<FollowDTO> findFollowingDTOByUserId(String userId) {
        return followJpaRepository.findFollowingDTOByUserId(userId);
    }
}
