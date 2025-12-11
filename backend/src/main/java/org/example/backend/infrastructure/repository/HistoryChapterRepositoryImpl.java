package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.HistoryChapter;
import org.example.backend.domain.repository.HistoryChapterRepository;
import org.example.backend.infrastructure.dto.HistoryChapterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

interface JpaHistoryChapterRepository extends JpaRepository<HistoryChapter, Long> {

    Optional<HistoryChapter> findByIdHistoryAndIdChapter(String idHistory, Long  idChapter);

    @Query("SELECT new org.example.backend.infrastructure.dto.HistoryChapterDTO(" +
            "h.idHistoryChapter, h.idHistory, h.idChapter, h.readAt) " +
            "FROM HistoryChapter h WHERE h.idHistory = ?1 ORDER BY h.readAt DESC")
    List<HistoryChapterDTO> findDTOByHistoryId(String idHistory);

    List<HistoryChapter> findByIdHistoryOrderByReadAtDesc(String idHistory);
}

@Repository
public class HistoryChapterRepositoryImpl implements HistoryChapterRepository {

    @Autowired
    private JpaHistoryChapterRepository jpaHistoryChapterRepository;

    @Override
    public HistoryChapter save(HistoryChapter historyChapter) {
        return jpaHistoryChapterRepository.save(historyChapter);
    }

    @Override
    public Optional<HistoryChapter> findById(Long idHistoryChapter) {
        return jpaHistoryChapterRepository.findById(idHistoryChapter);
    }

    @Override
    public List<HistoryChapter> findAll() {
        return jpaHistoryChapterRepository.findAll();
    }

    @Override
    public void deleteById(Long idHistoryChapter) {
        jpaHistoryChapterRepository.deleteById(idHistoryChapter);
    }

    @Override
    public Optional<HistoryChapter> findByHistoryAndChapter(String idHistory, Long  idChapter) {
        return jpaHistoryChapterRepository.findByIdHistoryAndIdChapter(idHistory, idChapter);
    }

    @Override
    public List<HistoryChapterDTO> findByHistoryId(String idHistory) {
        return jpaHistoryChapterRepository.findDTOByHistoryId(idHistory);
    }

    @Override
    public List<HistoryChapter> findByHistoryOrderByReadAt(String idHistory) {
        return jpaHistoryChapterRepository.findByIdHistoryOrderByReadAtDesc(idHistory);
    }
}
