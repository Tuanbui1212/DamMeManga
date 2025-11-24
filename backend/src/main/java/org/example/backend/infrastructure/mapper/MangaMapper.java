package org.example.backend.infrastructure.mapper;

import org.example.backend.domain.model.Manga;
import org.example.backend.infrastructure.entity.MangaEntity;

public class MangaMapper {
    public static Manga toDomain(MangaEntity entity) {
        if (entity == null) return null;
        return new Manga(
                entity.getId(),
                entity.getName(),
                entity.getAuthorId(),
                entity.getDescription(),
                entity.getBannerUrl(),
                entity.getPosterUrl(),
                entity.getStatus(),
                entity.getCountView(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public static MangaEntity toEntity(Manga manga) {
        if (manga == null) return null;
        MangaEntity entity = new MangaEntity();
        entity.setId(manga.getId());
        entity.setName(manga.getName());
        entity.setAuthorId(manga.getAuthorId());
        entity.setDescription(manga.getDescription());
        entity.setBannerUrl(manga.getBannerUrl());
        entity.setPosterUrl(manga.getPosterUrl());
        entity.setStatus(manga.getStatus());
        entity.setCountView(manga.getCountView());
        entity.setCreatedAt(manga.getCreatedAt());
        entity.setUpdatedAt(manga.getUpdatedAt());
        return entity;
    }
}
