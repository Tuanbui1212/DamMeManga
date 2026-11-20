package org.example.backend.usecase;

import org.example.backend.domain.model.Author;
import org.example.backend.domain.model.Manga;
import org.example.backend.domain.repository.AuthorRepository;
import org.example.backend.domain.repository.MangaRepository;
import org.example.backend.infrastructure.dto.MangaDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MangaUseCaseTest {

    @Mock
    private MangaRepository mangaRepository;

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private MangaUseCase mangaUseCase;

    private Manga sampleManga;
    private Author sampleAuthor;

    @BeforeEach
    void setUp() {
        sampleAuthor = new Author("Oda Eiichiro");
        sampleAuthor.setIdAuthor("auth-1");
        sampleManga = new Manga();
        sampleManga.setIdManga("manga-1");
        sampleManga.setNameManga("One Piece");
        sampleManga.setAuthor(sampleAuthor);
        sampleManga.setDescription("Pirate adventure");
        sampleManga.setBannerUrl("https://example.com/banner.jpg");
        sampleManga.setPosterUrl("https://example.com/poster.jpg");
        sampleManga.setStatus("Ongoing");
        sampleManga.setCountView(15000);
        sampleManga.setCreateAt(LocalDateTime.now());
        sampleManga.setUpdateAt(LocalDateTime.now());
    }

    @Test
    @DisplayName("create - should save and return MangaDTO successfully")
    void testCreate() {
        when(mangaRepository.save(any(Manga.class))).thenReturn(sampleManga);

        MangaDTO dto = mangaUseCase.create(sampleManga);

        assertNotNull(dto);
        assertEquals("manga-1", dto.getId());
        assertEquals("One Piece", dto.getName());
        assertEquals("Oda Eiichiro", dto.getAuthorName());
        verify(mangaRepository, times(1)).save(sampleManga);
    }

    @Test
    @DisplayName("getById - should return MangaDTO when found")
    void testGetById_Found() {
        when(mangaRepository.findById("manga-1")).thenReturn(Optional.of(sampleManga));

        MangaDTO dto = mangaUseCase.getById("manga-1");

        assertNotNull(dto);
        assertEquals("One Piece", dto.getName());
        verify(mangaRepository, times(1)).findById("manga-1");
    }

    @Test
    @DisplayName("getById - should throw exception when not found")
    void testGetById_NotFound() {
        when(mangaRepository.findById("non-existent")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> mangaUseCase.getById("non-existent"));
        verify(mangaRepository, times(1)).findById("non-existent");
    }

    @Test
    @DisplayName("getTopMangas - should delegate to repository with correct limit")
    void testGetTopMangas() {
        MangaDTO dto = new MangaDTO("manga-1", "One Piece", "Oda", "Desc", "banner", "poster", "Ongoing", 20000, LocalDateTime.now(), LocalDateTime.now());
        when(mangaRepository.findTopMangas(10)).thenReturn(List.of(dto));

        List<MangaDTO> results = mangaUseCase.getTopMangas(10);

        assertEquals(1, results.size());
        assertEquals("One Piece", results.get(0).getName());
        verify(mangaRepository, times(1)).findTopMangas(10);
    }

    @Test
    @DisplayName("search - should delegate query and limit to repository")
    void testSearch() {
        MangaDTO dto = new MangaDTO("manga-1", "One Piece", "Oda", "Desc", "banner", "poster", "Ongoing", 20000, LocalDateTime.now(), LocalDateTime.now());
        when(mangaRepository.search("piece", 5)).thenReturn(List.of(dto));

        List<MangaDTO> results = mangaUseCase.search("piece", 5);

        assertEquals(1, results.size());
        verify(mangaRepository, times(1)).search("piece", 5);
    }

    @Test
    @DisplayName("increaseView - should invoke repository increaseView")
    void testIncreaseView() {
        doNothing().when(mangaRepository).increaseView("manga-1");

        mangaUseCase.increaseView("manga-1");

        verify(mangaRepository, times(1)).increaseView("manga-1");
    }

    @Test
    @DisplayName("getMangasPaged - should return PageResponse with items and pagination metadata")
    void testGetMangasPaged() {
        MangaDTO dto = new MangaDTO("manga-1", "One Piece", "Oda", "Desc", "banner", "poster", "Ongoing", 20000, LocalDateTime.now(), LocalDateTime.now());
        org.springframework.data.domain.Page<MangaDTO> mockPage = new org.springframework.data.domain.PageImpl<>(
                List.of(dto),
                org.springframework.data.domain.PageRequest.of(0, 18),
                1
        );
        when(mangaRepository.findMangasPaged(eq("One"), eq("Action"), eq("Ongoing"), any(org.springframework.data.domain.Pageable.class)))
                .thenReturn(mockPage);

        var response = mangaUseCase.getMangasPaged("One", "Action", "Ongoing", 0, 18, "views,desc");

        assertNotNull(response);
        assertEquals(1, response.getContent().size());
        assertEquals(0, response.getPageNumber());
        assertEquals(18, response.getPageSize());
        assertEquals(1L, response.getTotalElements());
        assertEquals(1, response.getTotalPages());
    }
}
