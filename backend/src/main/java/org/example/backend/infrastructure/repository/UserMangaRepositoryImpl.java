package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.UserMangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaUserMangaRepository extends JpaRepository<Manga,String> {}

@Repository
public class UserMangaRepositoryImpl implements UserMangaRepository{
    @Autowired
    private JpaUserMangaRepository jpaUserMangaRepository;

    @Override
    public List<Manga> findAll() {
        return jpaUserMangaRepository.findAll();
    }

    @Override
    public Optional<Manga> findById(String id) {
        return jpaUserMangaRepository.findById(id);
    }
}
