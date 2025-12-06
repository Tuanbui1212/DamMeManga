package org.example.backend.infrastructure.repository;

import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.repository.jpa.MangaJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MangaRepositoryImpl implements MangaRepository {

    private final MangaJpaRepository mangaJpaRepository;

    public MangaRepositoryImpl(MangaJpaRepository mangaJpaRepository) {
        this.mangaJpaRepository = mangaJpaRepository;
    }

    @Override
    public Manga save(Manga manga) {
        return mangaJpaRepository.save(manga);
    }

    @Override
    public Optional<Manga> findById(String id) {
        return mangaJpaRepository.findById(id);
    }

    @Override
    public void deleteById(String id) {
        mangaJpaRepository.deleteById(id);
    }

    @Override
    public List<Manga> findAll() {
        return mangaJpaRepository.findAll();
    }

    @Override
    public List<MangaDTO> findAllDTO() {
        return mangaJpaRepository.findAllDTO();
    }

    @Override
    public List<Manga> findMangaByAllCategoryNames(List<String> categoryNames, long categoryCount) {
        return mangaJpaRepository.findMangaByAllCategoryNames(categoryNames, categoryCount);
    }
}
