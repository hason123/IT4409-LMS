package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.util.List;

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
    private Integer id;
    private String title;
    private String description;
    private Short orderIndex;
    @Column(name = "min_pass_score")
    private String minPassScore;

    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    @OneToMany(mappedBy = "quiz")
    private List<QuizQuestion> questions;

    @OneToMany(mappedBy = "quiz")
    private List<Comment> comments;

    @OneToMany(mappedBy = "quiz")
    private List<QuizAttempt> attempts;
}

