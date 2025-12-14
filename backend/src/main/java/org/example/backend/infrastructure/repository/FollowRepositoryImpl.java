package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Follow;
import org.example.backend.domain.repository.FollowRepository;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class FollowRepositoryImpl implements FollowRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Follow save(Follow follow) {
        em.persist(follow);
        return follow;
    }

    @Override
    public Optional<Follow> findById(String id) {
        return Optional.ofNullable(em.find(Follow.class, id));
    }

    @Override
    public List<Follow> findByUserId(String userId) {
        return em.createQuery("SELECT f FROM Follow f WHERE f.userId = :userId", Follow.class)
                 .setParameter("userId", userId)
                 .getResultList();
    }

    @Override
    public void deleteById(String id) {
        findById(id).ifPresent(em::remove);
    }
}
