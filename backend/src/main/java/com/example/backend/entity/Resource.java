package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import com.example.backend.constant.ResourceType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "resource")
@SQLDelete(sql = "UPDATE resource SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Resource extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "filetype")
    private ResourceType type;

    @Column(name = "orderindex")
    private Integer orderIndex;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
