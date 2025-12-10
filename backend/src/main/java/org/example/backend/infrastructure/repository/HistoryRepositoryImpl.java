package org.example.backend.infrastructure.repository;

import org.example.backend.domain.model.History;
import org.example.backend.domain.repository.HistoryRepository;
import org.example.backend.infrastructure.dto.HistoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


// =======================
// JPA Interface Internal
// =======================
interface JpaHistoryRepository extends JpaRepository<History, String> {

    // Tìm history theo user + manga (đúng chuẩn entity ManyToOne)
    Optional<History> findByUser_IdUserAndManga_IdManga(String userId, String mangaId);

    // Lấy DTO cho API trả về danh sách history
    @Query("""
        SELECT new org.example.backend.infrastructure.dto.HistoryDTO(
            h.idHistory,
            h.user.idUser,
            h.manga.idManga,
            h.lastRead
        )
        FROM History h
        WHERE h.user.idUser = :userId
        ORDER BY h.lastRead DESC
    """)
    List<HistoryDTO> findDTOByIdUser(@Param("userId") String userId);

    // Lấy history bao gồm Manga và Author => tránh N+1
    @Query("""
        SELECT h FROM History h
        JOIN FETCH h.manga m
        JOIN FETCH m.author
        WHERE h.user.idUser = :userId
        ORDER BY h.lastRead DESC
    """)
    List<History> findByUserWithManga(@Param("userId") String userId);

    // Lấy toàn bộ history theo user ORDER BY last read
    List<History> findByUser_IdUserOrderByLastReadDesc(String userId);
}


// =======================
// Repository Implementation
// =======================
@Repository
public class HistoryRepositoryImpl implements HistoryRepository {

    @Autowired
    private JpaHistoryRepository jpa;

    @Override
    public History save(History history) {
        return jpa.save(history);
    }

    @Override
    public Optional<History> findById(String idHistory) {
        return jpa.findById(idHistory);
    }

    @Override
    public List<History> findAll() {
        return jpa.findAll();
    }

    @Override
    public void deleteById(String idHistory) {
        jpa.deleteById(idHistory);
    }

    @Override
    public Optional<History> findByUserAndManga(String userId, String mangaId) {
        return jpa.findByUser_IdUserAndManga_IdManga(userId, mangaId);
    }

    @Override
    public List<HistoryDTO> findByUser(String userId) {
        return jpa.findDTOByIdUser(userId);
    }

    @Override
    public List<History> findByUserOrderByLastRead(String userId) {
        return jpa.findByUser_IdUserOrderByLastReadDesc(userId);
    }

    @Override
    public List<History> findByUserWithManga(String userId) {
        return jpa.findByUserWithManga(userId);
    }
}
