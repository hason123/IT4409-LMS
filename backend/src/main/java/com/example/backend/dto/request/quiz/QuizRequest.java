package com.example.backend.dto.request.quiz;
import lombok.*;

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
}
