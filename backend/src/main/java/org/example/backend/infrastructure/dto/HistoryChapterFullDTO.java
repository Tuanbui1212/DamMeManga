package org.example.backend.infrastructure.dto;


public record HistoryChapterFullDTO(
        Long idHistoryChapter,
        String idHistory,
        Long idChapter,
        Integer chapterNumber,
        LocalDateTime readAt,
        String mangaId,
        String mangaName
) {}
