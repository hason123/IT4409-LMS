package com.example.backend.dto.request.quiz;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerRequest {
    private String description;
    private Boolean isCorrect;
}
