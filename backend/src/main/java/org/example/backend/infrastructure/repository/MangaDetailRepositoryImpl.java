package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.MangaDetail;
import org.example.backend.domain.repository.MangaDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaMangaDetailRepository extends JpaRepository<MangaDetail,String> {}

@Repository
public class MangaDetailRepositoryImpl implements MangaDetailRepository {
    @Autowired
    private JpaMangaDetailRepository jpaMangaDetailRepository;

    @Override
    public List<MangaDetail> findAll() {
        return jpaMangaDetailRepository.findAll();
    }

    @Override
    public Optional<MangaDetail> findById(String id) {
        return jpaMangaDetailRepository.findById(id);
    }
}
