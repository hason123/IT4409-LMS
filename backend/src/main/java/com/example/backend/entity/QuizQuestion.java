package com.example.backend.entity;

import com.example.backend.constant.QuestionType;
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
    private Integer id;
    private String title;

    private String fileUrl;
    private String embedUrl;
    private String cloudinaryId;
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @OneToMany(mappedBy = "quizQuestion")
    private List<QuizAnswer> answers;
}
