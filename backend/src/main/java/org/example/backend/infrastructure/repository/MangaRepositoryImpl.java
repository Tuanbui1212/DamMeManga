package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.entity.MangaEntity;
import org.example.backend.infrastructure.mapper.MangaMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class MangaRepositoryImpl implements MangaRepository {
    private final MangaJpaRepository mangaJpaRepository;

    public MangaRepositoryImpl(MangaJpaRepository mangaJpaRepository) {
        this.mangaJpaRepository = mangaJpaRepository;
    }

    @Override
    public Optional<Manga> findById(String id) {
        return mangaJpaRepository.findById(id).map(MangaMapper::toDomain);
    }

    @Override
    public List<Manga> findAll() {
        return mangaJpaRepository.findAll()
                .stream()
                .map(MangaMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Manga save(Manga manga) {
        MangaEntity entity = MangaMapper.toEntity(manga);
        MangaEntity saved = mangaJpaRepository.save(entity);
        return MangaMapper.toDomain(saved);
    }

    @Override
    public void deleteById(String id) {
        mangaJpaRepository.deleteById(id);
    }
}
