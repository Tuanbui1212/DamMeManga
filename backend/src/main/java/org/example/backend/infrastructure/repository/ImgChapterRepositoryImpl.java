package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.ImgChapter;
import org.example.backend.domain.repository.ImgChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// Internal JPA Interface
interface JpaImgChapterRepository extends JpaRepository<ImgChapter, Long> {
    List<ImgChapter> findByChapterId(Long chapterId);
}

@Repository
public class ImgChapterRepositoryImpl implements ImgChapterRepository {

    private final JpaImgChapterRepository jpaImgChapterRepository;

    @Autowired
    public ImgChapterRepositoryImpl(JpaImgChapterRepository jpaImgChapterRepository) {
        this.jpaImgChapterRepository = jpaImgChapterRepository;
    }

    @Override
    public List<ImgChapter> saveAll(Iterable<ImgChapter> imgChapters) {
        return jpaImgChapterRepository.saveAll(imgChapters);
    }

    @Override
    public List<ImgChapter> findAll() {
        return jpaImgChapterRepository.findAll();
    }

    @Override
    public Optional<ImgChapter> findById(Long id) {
        return jpaImgChapterRepository.findById(id);
    }

    @Override
    public ImgChapter update(ImgChapter imgChapter) {
        return jpaImgChapterRepository.save(imgChapter);
    }

    @Override
    public void deleteById(Long id) {
        jpaImgChapterRepository.deleteById(id);
    }

    @Override
    public List<ImgChapter> findByChapterId(Long chapterId) {
        return jpaImgChapterRepository.findByChapterId(chapterId);
    }
}