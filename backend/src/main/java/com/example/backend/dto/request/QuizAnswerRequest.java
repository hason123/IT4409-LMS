package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerRequest {
    private String description;
    private Boolean isCorrect;
    private Long quizQuesId;
}
