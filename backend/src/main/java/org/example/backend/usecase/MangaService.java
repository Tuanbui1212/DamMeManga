package org.example.backend.usecase;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.dto.MangaDTO;

import java.util.List;
import java.util.Map;

public interface MangaService {
    MangaDTO  create(Manga manga);

    MangaDTO  update(String id, Manga manga);

    void delete(String id);

    MangaDTO  patchManga(String id, Map<String, Object> updates);

    List<MangaDTO> getAll();

    MangaDTO getById(String id);
}
