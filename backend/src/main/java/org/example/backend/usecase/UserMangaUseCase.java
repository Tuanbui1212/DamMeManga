package org.example.backend.usecase;

import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.UserMangaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMangaUseCase {
    private final UserMangaRepository userMangaRepository;

    public UserMangaUseCase(UserMangaRepository userMangaRepository) {
        this.userMangaRepository = userMangaRepository;
    }

    public List<Manga> findAllManga(){
        return userMangaRepository.findAll();
    }

    public Optional<Manga> findMangaById(String id){
        return userMangaRepository.findById(id);
    }
}
