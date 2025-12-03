package org.example.backend.usecase;

import org.example.backend.domain.model.MangaDetail;
import org.example.backend.domain.repository.MangaDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MangaDetailUseCase {
    private final MangaDetailRepository mangaDetailRepository;

    public MangaDetailUseCase(MangaDetailRepository mangaDetailRepository) {
        this.mangaDetailRepository = mangaDetailRepository;
    }

    public List<MangaDetail> findAllManga(){
        return mangaDetailRepository.findAll();
    }

    public Optional<MangaDetail> findMangaById(String id){
        return mangaDetailRepository.findById(id);
    }

    public MangaDetail getMangaWithChapters(String idManga) {
        MangaDetail mangaDetail = mangaDetailRepository.findById(idManga)
                .orElseThrow(() -> new RuntimeException("Manga not found"));
        mangaDetail.getChapters().size();

        return mangaDetail;
    }
}
