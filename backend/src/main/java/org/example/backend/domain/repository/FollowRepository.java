package org.example.backend.domain.repository;

import org.example.backend.domain.model.Follow;
import org.example.backend.infrastructure.dto.FollowDTO;
import org.example.backend.infrastructure.dto.TopMangaFollowDTO;

import java.util.List;
import java.util.Optional;

public interface FollowRepository {

    List<Follow> findAll();

    Follow save(Follow follow);

    Optional<Follow> findById(String id);

    void deleteById(String id);

    List<FollowDTO> findFollowingDTOByUserId(String userId);

    List<TopMangaFollowDTO> findTopMangaFollowed();
}
