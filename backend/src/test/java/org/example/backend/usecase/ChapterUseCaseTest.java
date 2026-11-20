package org.example.backend.usecase;

import org.example.backend.domain.model.Chapter;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.ChapterRepository;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.ChapterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChapterUseCaseTest {

    @Mock
    private ChapterRepository chapterRepository;

    @Mock
    private MangaRepository mangaRepository;

    @InjectMocks
    private ChapterUseCase chapterUseCase;

    private Manga sampleManga;
    private Chapter sampleChapter;

    @BeforeEach
    void setUp() {
        sampleManga = new Manga();
        sampleManga.setIdManga("manga-1");
        sampleManga.setNameManga("One Piece");

        sampleChapter = new Chapter(sampleManga, 1, "Romance Dawn");
        sampleChapter.setIdChapter(101L);
    }

    @Test
    @DisplayName("createChapter - should verify manga existence and save chapter once")
    void testCreateChapter() {
        ChapterRequest req = new ChapterRequest("manga-1", 1, "Romance Dawn");
        when(mangaRepository.findById("manga-1")).thenReturn(Optional.of(sampleManga));
        when(chapterRepository.save(any(Chapter.class))).thenReturn(sampleChapter);

        Chapter result = chapterUseCase.createChapter(req);

        assertNotNull(result);
        assertEquals(101L, result.getIdChapter());
        assertEquals("Romance Dawn", result.getTitle());
        verify(chapterRepository, times(1)).save(any(Chapter.class));
        verify(mangaRepository, times(1)).save(sampleManga);
    }

    @Test
    @DisplayName("createChapter - should throw when manga does not exist")
    void testCreateChapter_MangaNotFound() {
        ChapterRequest req = new ChapterRequest("non-existent", 1, "Title");
        when(mangaRepository.findById("non-existent")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> chapterUseCase.createChapter(req));
        verify(chapterRepository, never()).save(any(Chapter.class));
    }

    @Test
    @DisplayName("getChapterById - should return chapter when exists")
    void testGetChapterById_Found() {
        when(chapterRepository.findById(101L)).thenReturn(Optional.of(sampleChapter));

        Chapter result = chapterUseCase.getChapterById(101L);

        assertNotNull(result);
        assertEquals(1, result.getChapterNumber());
        verify(chapterRepository, times(1)).findById(101L);
    }

    @Test
    @DisplayName("deleteChapter - should delete chapter by id")
    void testDeleteChapter() {
        when(chapterRepository.findById(101L)).thenReturn(Optional.of(sampleChapter));
        doNothing().when(chapterRepository).deleteById(101L);

        chapterUseCase.deleteChapter(101L);

        verify(chapterRepository, times(1)).deleteById(101L);
    }

    @Test
    @DisplayName("getChaptersByMangaId - should return list of chapters")
    void testGetChaptersByMangaId() {
        when(chapterRepository.getChaptersByMangaId("manga-1")).thenReturn(List.of(sampleChapter));

        List<Chapter> chapters = chapterUseCase.getChaptersByMangaId("manga-1");

        assertEquals(1, chapters.size());
        assertEquals("Romance Dawn", chapters.get(0).getTitle());
    }
}
