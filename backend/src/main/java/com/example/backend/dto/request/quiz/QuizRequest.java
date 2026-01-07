package com.example.backend.dto.request.quiz;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizRequest {
    private String title;
    private String description;
    private Integer minPassScore;
    private Integer timeLimitMinutes;
    private Integer maxAttempts;
    private List<QuizQuestionRequest> questions;
}
