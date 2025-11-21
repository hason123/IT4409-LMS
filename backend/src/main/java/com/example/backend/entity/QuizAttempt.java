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
@Table(name = "quiz_attempt")
@SQLDelete(sql = "UPDATE quiz_attempt SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class QuizAttempt extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "completedtime")
    private String completedTime;
    private Integer grade;

    @Column(name = "is_passed")
    private Boolean isPassed;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    private String answerText;
}
