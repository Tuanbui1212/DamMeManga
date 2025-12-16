package org.example.backend.usecase;

import org.example.backend.domain.model.Follow;
import org.example.backend.domain.repository.FollowRepository;
import org.example.backend.infrastructure.dto.FollowDTO;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FollowUseCase {

    private final FollowRepository followRepository;

    public FollowUseCase(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public Follow follow(String userId, String mangaId) {
        Follow follow = new Follow(
                UUID.randomUUID().toString(),
                userId,
                mangaId
        );
        return followRepository.save(follow);
    }

    public List<FollowDTO> getFollowingMangas(String userId) {
        return followRepository.findFollowingDTOByUserId(userId);
    }

    public void unfollow(String followId) {
        followRepository.deleteById(followId);
    }

    public Optional<Follow> getFollowById(String id) {
        return followRepository.findById(id);
    }
}

