package org.example.backend.presentation.controller;

import org.example.backend.infrastructure.dto.HistoryDTO;
import org.example.backend.usecase.HistoryUseCase;
import org.example.backend.domain.model.History;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/history")
@CrossOrigin("*")
public class HistoryController {

    private final HistoryUseCase useCase;

    public HistoryController(HistoryUseCase useCase) {
        this.useCase = useCase;
    }

    // Ghi lại lịch sử đọc
    @PostMapping("/read")
    public HistoryDTO recordReading(
            @RequestParam String userId,
            @RequestParam String mangaId
    ) {
        History history = useCase.recordHistory(userId, mangaId);

        return new HistoryDTO(
                history.getIdHistory(),
                history.getUser().getIdUser(),
                history.getManga().getIdManga(),
                history.getLastRead()
        );
    }

    // Lấy tất cả lịch sử (trả về entity nhưng có thể đổi thành DTO nếu cần)
    @GetMapping
    public List<History> getAllHistories() {
        return useCase.getAllHistories();
    }

    // Lấy lịch sử theo ID
    @GetMapping("/{id}")
    public Optional<History> getHistoryById(@PathVariable String id) {
        return useCase.getHistoryById(id);
    }

    // Lấy lịch sử theo user (trả về HistoryDTO)
    @GetMapping("/user/{idUser}")
    public List<HistoryDTO> getHistoryByUser(@PathVariable String idUser) {
        return useCase.getHistoryByUser(idUser);
    }

    // Xóa lịch sử
    @DeleteMapping("/{id}")
    public void deleteHistory(@PathVariable String id) {
        useCase.deleteHistory(id);
    }
}
