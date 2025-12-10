package org.example.backend.usecase;

import org.example.backend.domain.model.Follow;
import org.example.backend.domain.repository.FollowRepository;
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
        String id = UUID.randomUUID().toString();
        Follow follow = new Follow(id, userId, mangaId);
        return followRepository.save(follow);
    }

    public List<Follow> getFollowsByUser(String userId) {
        return followRepository.findByUserId(userId);
    }

    public Optional<Follow> getFollowById(String id) {
        return followRepository.findById(id);
    }

    public void unfollow(String id) {
        followRepository.deleteById(id);
    }
}
