package org.example.backend.usecase;

import org.example.backend.domain.model.HistoryChapter;
import org.example.backend.domain.repository.HistoryChapterRepository;
import org.example.backend.infrastructure.dto.HistoryChapterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryChapterUseCase {

    @Autowired
    private HistoryChapterRepository historyChapterRepository;

    public HistoryChapter recordHistoryChapter(String idHistory, Long idChapter) {
        Optional<HistoryChapter> optional = historyChapterRepository.findByHistoryAndChapter(idHistory, idChapter);
        HistoryChapter historyChapter;
        if (optional.isPresent()) {
            historyChapter = optional.get();
            historyChapter.setReadAt(LocalDateTime.now());
        } else {
            historyChapter = new HistoryChapter(); 
            historyChapter.setIdHistory(idHistory);
            historyChapter.setIdChapter(idChapter);
            historyChapter.setReadAt(LocalDateTime.now());
        }
        return historyChapterRepository.save(historyChapter);

    }

    public List<HistoryChapter> getAllHistoryChapters() {
        return historyChapterRepository.findAll();
    }

    public Optional<HistoryChapter> getHistoryChapterById(Long idHistoryChapter) {
        return historyChapterRepository.findById(idHistoryChapter);
    }

    public void deleteHistoryChapter(Long idHistoryChapter) {
        historyChapterRepository.deleteById(idHistoryChapter);
    }

    public List<HistoryChapterDTO> getHistoryChaptersByHistory(String idHistory) {
        return historyChapterRepository.findByHistoryId(idHistory);
    }
}
