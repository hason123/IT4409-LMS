package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "quiz")
@SQLDelete(sql = "UPDATE quiz SET is_deleted = true WHERE id = ?")
@SQLRestriction(value = "is_deleted = false")
public class Quiz extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Integer orderIndex;
    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
    private Integer minPassScore;
}

