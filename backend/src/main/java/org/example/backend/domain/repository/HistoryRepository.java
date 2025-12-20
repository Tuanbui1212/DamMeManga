package org.example.backend.domain.repository;

import org.example.backend.domain.model.History;
import org.example.backend.infrastructure.dto.HistoryDTO;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository {

    History save(History history);

    Optional<History> findById(String idHistory);

    List<History> findAll();

    void deleteById(String idHistory);

    Optional<History> findByUserAndManga(String userId, String mangaId);

    List<HistoryDTO> findByUser(String userId);

    List<History> findByUserOrderByLastRead(String userId);

    List<History> findByUserWithManga(String userId);
}
