package org.example.backend.usecase;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MangaDetailUseCase {
    private final MangaRepository mangaRepository;

    public MangaDetailUseCase(MangaRepository mangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    @Transactional(readOnly = true)
    public List<Manga> findAllManga() {
        return mangaRepository.findAllWithChapters();
    }

    @Transactional(readOnly = true)
    public Optional<Manga> findMangaById(String id) {
        return mangaRepository.findByIdWithChapters(id);
    }

    @Transactional(readOnly = true)
    public Manga getMangaWithChapters(String idManga) {
        return mangaRepository.findByIdWithChapters(idManga)
                .orElseThrow(() -> new RuntimeException("Manga not found with id: " + idManga));
    }
}
