package org.example.backend.usecase.impl;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.usecase.MangaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MangaServiceImpl implements MangaService {

    private final MangaRepository mangaRepository;

    public MangaServiceImpl(MangaRepository mangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    // Convert Entity → DTO (Lấy name_author)
    private MangaDTO toDTO(Manga m) {
        return new MangaDTO(
                m.getIdManga(),
                m.getNameManga(),
                m.getAuthor().getNameAuthor(),  // lấy tên tác giả
                m.getDescription(),
                m.getBannerUrl(),
                m.getPosterUrl(),
                m.getStatus(),
                m.getCountView(),
                m.getCreateAt(),
                m.getUpdateAt()
        );
    }

    @Override
    public Manga create(Manga manga) {
        return mangaRepository.save(manga);
    }

    @Override
    public Manga update(String id, Manga manga) {
        Manga old = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manga không tồn tại"));

        old.setNameManga(manga.getNameManga());
        old.setAuthor(manga.getAuthor());
        old.setDescription(manga.getDescription());
        old.setBannerUrl(manga.getBannerUrl());
        old.setPosterUrl(manga.getPosterUrl());
        old.setStatus(manga.getStatus());

        return mangaRepository.save(old);
    }

    @Override
    public void delete(String id) {
        mangaRepository.deleteById(id);
    }

    @Override
    public List<MangaDTO> getAll() {
        return mangaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MangaDTO getById(String id) {
        Manga m = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy manga"));
        return toDTO(m);
    }
}
