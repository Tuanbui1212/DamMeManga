package org.example.backend.domain.repository;

import org.example.backend.domain.model.HistoryChapter;
import org.example.backend.infrastructure.dto.HistoryChapterDTO;

import java.util.List;
import java.util.Optional;

public interface HistoryChapterRepository {

    HistoryChapter save(HistoryChapter historyChapter);

    Optional<HistoryChapter> findById(Long idHistoryChapter);

    List<HistoryChapter> findAll();

    void deleteById(Long idHistoryChapter);

    Optional<HistoryChapter> findByHistoryAndChapter(String idHistory, Long idChapter);

    List<HistoryChapterDTO> findByHistoryId(String idHistory);

    List<HistoryChapter> findByHistoryOrderByReadAt(String idHistory);
}
