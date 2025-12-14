package org.example.backend.usecase;

import org.example.backend.domain.model.History;
import org.example.backend.domain.model.User;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.HistoryRepository;
import org.example.backend.domain.repository.UserRepository;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.HistoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HistoryUseCase {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MangaRepository mangaRepository;


    /**
     * Ghi lại lịch sử đọc
     * Nếu tồn tại → update lastRead
     * Nếu chưa → tạo mới
     */
    public History recordHistory(String userId, String mangaId) {

        // Tìm user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Tìm manga
        Manga manga = mangaRepository.findById(mangaId)
                .orElseThrow(() -> new RuntimeException("Manga not found"));

        // Kiểm tra tồn tại history
        Optional<History> optional = historyRepository.findByUserAndManga(userId, mangaId);

        History history;

        if (optional.isPresent()) {
            // Update lastRead
            history = optional.get();
            history.setLastRead(LocalDateTime.now());
        } else {
            // Tạo mới
            history = new History(
                    UUID.randomUUID().toString(),
                    user,
                    manga,
                    LocalDateTime.now()
            );
        }

        return historyRepository.save(history);
    }


    public List<History> getAllHistories() {
        return historyRepository.findAll();
    }

    public Optional<History> getHistoryById(String idHistory) {
        return historyRepository.findById(idHistory);
    }

    public void deleteHistory(String idHistory) {
        historyRepository.deleteById(idHistory);
    }

    public List<HistoryDTO> getHistoryByUser(String userId) {
        return historyRepository.findByUser(userId);
    }
}
