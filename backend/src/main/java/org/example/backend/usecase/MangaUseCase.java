package org.example.backend.usecase;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.domain.repository.AuthorRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.infrastructure.dto.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MangaUseCase {

    private final MangaRepository mangaRepository;
    private final AuthorRepository authorRepository;

    public MangaUseCase(MangaRepository mangaRepository, AuthorRepository authorRepository) {
        this.mangaRepository = mangaRepository;
        this.authorRepository = authorRepository;
    }

    public MangaDTO create(Manga manga) {
        Manga saved = mangaRepository.save(manga);
        return mapToDTO(saved);
    }

    public List<MangaDTO> getAll() {
        return mangaRepository.findAllDTO();
    }

    public PageResponse<MangaDTO> getMangasPaged(String query, String category, String status, int page, int size, String sort) {
        Sort sortObj = Sort.by(Sort.Direction.DESC, "updateAt");
        if (sort != null && !sort.isBlank()) {
            String[] parts = sort.split(",");
            String field = parts[0].trim();
            Sort.Direction direction = (parts.length > 1 && "asc".equalsIgnoreCase(parts[1].trim()))
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
            if ("views".equalsIgnoreCase(field) || "countView".equalsIgnoreCase(field)) {
                field = "countView";
            } else if ("name".equalsIgnoreCase(field) || "nameManga".equalsIgnoreCase(field)) {
                field = "nameManga";
            } else if ("createAt".equalsIgnoreCase(field)) {
                field = "createAt";
            } else {
                field = "updateAt";
            }
            sortObj = Sort.by(direction, field);
        }

        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, Math.min(size, 100)), sortObj);
        Page<MangaDTO> pageResult = mangaRepository.findMangasPaged(query, category, status, pageable);
        return PageResponse.of(pageResult);
    }

    public List<MangaDTO> getTopMangas(int limit) {
        return mangaRepository.findTopMangas(limit);
    }

    public List<MangaDTO> getLatestMangas(int limit) {
        return mangaRepository.findLatestMangas(limit);
    }

    public List<MangaDTO> search(String query, int limit) {
        return mangaRepository.search(query, limit);
    }

    public MangaDTO getById(String id) {
        Manga m = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy manga"));
        return mapToDTO(m);
    }

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
        return mapToDTO(updated);
    }

    public MangaDTO patchManga(String id, Map<String, Object> updates) {
        Manga old = mangaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manga không tồn tại"));

        if (updates.containsKey("name") || updates.containsKey("nameManga")) {
            old.setNameManga((String) updates.getOrDefault("name", updates.get("nameManga")));
        }
        if (updates.containsKey("description"))
            old.setDescription((String) updates.get("description"));
        if (updates.containsKey("bannerUrl"))
            old.setBannerUrl((String) updates.get("bannerUrl"));
        if (updates.containsKey("posterUrl"))
            old.setPosterUrl((String) updates.get("posterUrl"));
        if (updates.containsKey("status"))
            old.setStatus((String) updates.get("status"));
        if (updates.containsKey("countView")) {
            Object countObj = updates.get("countView");
            if (countObj instanceof Number)
                old.setCountView(((Number) countObj).intValue());
            else if (countObj instanceof String)
                old.setCountView(Integer.parseInt((String) countObj));
        }
        if (updates.containsKey("authorId")) {
            String authorId = (String) updates.get("authorId");
            Author newAuthor = authorRepository.getAuthorById(authorId)
                    .orElseThrow(() -> new RuntimeException("Author không tồn tại"));
            old.setAuthor(newAuthor);
        }

        Manga saved = mangaRepository.save(old);
        return mapToDTO(saved);
    }

    public void delete(String id) {
        mangaRepository.deleteById(id);
    }

    private MangaDTO mapToDTO(Manga m) {
        String authorName = (m.getAuthor() != null && m.getAuthor().getNameAuthor() != null)
                ? m.getAuthor().getNameAuthor()
                : "Unknown";

        return new MangaDTO(
                m.getIdManga(),
                m.getNameManga(),
                authorName,
                m.getDescription(),
                m.getBannerUrl(),
                m.getPosterUrl(),
                m.getStatus(),
                m.getCountView(),
                m.getCreateAt(),
                m.getUpdateAt());
    }

    public List<MangaDTO> getByCategoryNames(List<String> categoryNames) {
        long categoryCount = categoryNames.size();

        List<Manga> mangas = mangaRepository.findMangaByAllCategoryNames(categoryNames, categoryCount);

        return mangas.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public long getTotalMangas() {
        return mangaRepository.countMangas();
    }

    public long getTotalViews() {
        return mangaRepository.countTotalViews();
    }

    public void increaseView(String id) {
        mangaRepository.increaseView(id);
    }
}
