package org.example.backend.infrastructure.config.domain.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Check;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Check(constraints = "role in ('ADMIN', 'USER')")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String user;
    String password;
    String role;

    @Column(updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDate createdAt;

    @OneToMany(mappedBy = "user")
    List<Follow> follows;
}
