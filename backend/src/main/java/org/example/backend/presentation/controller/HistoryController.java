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

    @GetMapping
    public List<History> getAllHistories() {
        return useCase.getAllHistories();
    }

    @GetMapping("/{id}")
    public Optional<History> getHistoryById(@PathVariable String id) {
        return useCase.getHistoryById(id);
    }

    @GetMapping("/user/{idUser}")
    public List<HistoryDTO> getHistoryByUser(@PathVariable String idUser) {
        return useCase.getHistoryByUser(idUser);
    }

    @DeleteMapping("/{id}")
    public void deleteHistory(@PathVariable String id) {
        useCase.deleteHistory(id);
    }
}
