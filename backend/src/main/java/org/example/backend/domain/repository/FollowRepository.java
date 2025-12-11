package org.example.backend.domain.repository;

import org.example.backend.domain.model.Follow;
import java.util.List;
import java.util.Optional;

public interface FollowRepository {

    Follow save(Follow follow);

    Optional<Follow> findById(String id);

    List<Follow> findByUserId(String userId);

    void deleteById(String id);
}
