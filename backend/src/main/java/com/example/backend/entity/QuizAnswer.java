package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "quiz_answer")
@SQLDelete(sql = "UPDATE quiz_answer SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class QuizAnswer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    private String description;

    @ManyToOne
    @JoinColumn(name = "quiz_question_id")
    private QuizQuestion quizQuestion;
}
