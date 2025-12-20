package org.example.backend.usecase;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.example.backend.infrastructure.repository.MangaRepositoryImpl;
import org.example.backend.domain.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MangaUseCase {

    private final MangaRepositoryImpl mangaRepository;
    private final AuthorRepository authorRepository;

    public MangaUseCase(MangaRepositoryImpl mangaRepository, AuthorRepository authorRepository) {
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
        return new MangaDTO(
                m.getIdManga(),
                m.getNameManga(),
                m.getAuthor().getNameAuthor(),
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
}
