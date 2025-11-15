package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "quiz_question")
@SQLDelete(sql = "UPDATE quiz_question SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class QuizQuestion extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz_id;

    @OneToMany(mappedBy = "quizQuestion")
    private List<QuizAnswer> answers;
}
