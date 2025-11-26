package org.example.backend.usecase;

import org.example.backend.presentation.dto.MangaDTO;
import org.example.backend.domain.model.Manga;

import java.util.List;

public interface MangaService {
    Manga create(Manga manga);
    Manga update(String id, Manga manga);
    void delete(String id);
    List<MangaDTO> getAll();
    MangaDTO getById(String id);
}
