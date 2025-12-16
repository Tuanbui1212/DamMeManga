package org.example.backend.infrastructure.dto;

import java.time.LocalDate;
import java.util.List;

public class DailyHistoryDTO {
    private LocalDate date;
    private List<MangaistoryDTO> mangas;

    public DailyHistoryDTO(LocalDate date, List<MangaHistoryDTO> mangas) {
        this.date = date;
        this.mangas = mangas;
    }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public List<MangaHistoryDTO> getMangas() { return mangas; }
    public void setMangas(List<MangaHistoryDTO> mangas) { this.mangas = mangas; }
}
