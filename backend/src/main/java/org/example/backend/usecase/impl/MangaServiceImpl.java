package org.example.backend.usecase.impl;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.AuthorRepository;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.usecase.MangaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MangaServiceImpl implements MangaService {

    private final MangaRepository mangaRepository;
    private final AuthorRepository authorRepository;

    public MangaServiceImpl(MangaRepository mangaRepository, AuthorRepository authorRepository) {
        this.mangaRepository = mangaRepository;
        this.authorRepository = authorRepository;
    }

    // Convert Entity → DTO (Lấy name_author)
    private MangaDTO toDTO(Manga m) {
        return new MangaDTO(
                m.getIdManga(),
                m.getNameManga(),
                m.getAuthor().getNameAuthor(), // lấy tên tác giả
                m.getDescription(),
                m.getBannerUrl(),
                m.getPosterUrl(),
                m.getStatus(),
                m.getCountView(),
                m.getCreateAt(),
                m.getUpdateAt());
    }

    @Override
    public MangaDTO create(Manga manga) {
        Manga saved = mangaRepository.save(manga);
        return toDTO(saved);
    }

    @Override
    public MangaDTO update(String id, Manga manga) {
        Manga old = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manga không tồn tại"));

        old.setNameManga(manga.getNameManga());
        old.setAuthor(manga.getAuthor());
        old.setDescription(manga.getDescription());
        old.setBannerUrl(manga.getBannerUrl());
        old.setPosterUrl(manga.getPosterUrl());
        old.setStatus(manga.getStatus());

        Manga updated = mangaRepository.save(old);
        return toDTO(updated);
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

    @Override
    public MangaDTO patchManga(String id, Map<String, Object> updates) {
        Manga old = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manga không tồn tại"));

        // Cập nhật tên
        if (updates.containsKey("name") || updates.containsKey("nameManga")) {
            old.setNameManga((String) updates.getOrDefault("name", updates.get("nameManga")));
        }
        // Cập nhật mô tả
        if (updates.containsKey("description")) {
            old.setDescription((String) updates.get("description"));
        }
        // Cập nhật banner
        if (updates.containsKey("bannerUrl")) {
            old.setBannerUrl((String) updates.get("bannerUrl"));
        }
        // Cập nhật poster
        if (updates.containsKey("posterUrl")) {
            old.setPosterUrl((String) updates.get("posterUrl"));
        }
        // Cập nhật status
        if (updates.containsKey("status")) {
            old.setStatus((String) updates.get("status"));
        }
        // Cập nhật countView
        if (updates.containsKey("countView")) {
            Object countObj = updates.get("countView");
            if (countObj instanceof Number) {
                old.setCountView(((Number) countObj).intValue());
            } else if (countObj instanceof String) {
                old.setCountView(Integer.parseInt((String) countObj));
            }
        }
        // Cập nhật author nếu có authorId
        if (updates.containsKey("authorId")) {
            String authorId = (String) updates.get("authorId");
            // Giả sử bạn có AuthorRepository để lấy Author theo ID
            Author newAuthor = authorRepository.findById(authorId)
                    .orElseThrow(() -> new RuntimeException("Author không tồn tại"));
            old.setAuthor(newAuthor);
        }

        Manga saved = mangaRepository.save(old);
        return toDTO(saved); // trả về DTO
    }

}
