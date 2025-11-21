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
@Table(name = "quiz_attempt_answer")
@SQLDelete(sql = "UPDATE quiz_attempt_answer SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class QuizAttemptAnswer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private QuizAttempt attempt;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    @ManyToOne
    @JoinColumn(name = "selected_answer_id")
    private QuizAnswer selectedAnswer;

    private String textAnswer;

    private Boolean isCorrect;
}

