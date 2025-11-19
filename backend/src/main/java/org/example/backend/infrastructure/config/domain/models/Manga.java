package org.example.backend.infrastructure.config.domain.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Check(constraints = "status in ('completed', 'ongoing')")
public class Manga {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    String description;
    String banner;
    String status;
    String poster;
    Integer countView;
    @ManyToOne
    Author author;

    @Column(updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDate createdAt;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date updatedAt;
}
