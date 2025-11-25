package org.example.backend.usecase;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MangaUseCase {
    private final MangaRepository mangaRepository;

    public MangaUseCase(MangaRepository mangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    public List<Manga> getAllMangas() {
        return mangaRepository.findAll();
    }

    public Optional<Manga> getMangaById(String id) {
        return mangaRepository.findById(id);
    }

    public Manga createManga(Manga manga) {
        return mangaRepository.save(manga);
    }

    public void deleteManga(String id) {
        mangaRepository.deleteById(id);
    }
}
