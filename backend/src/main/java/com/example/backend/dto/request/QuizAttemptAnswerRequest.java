package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptAnswerRequest {
    private Long questionId;
    private Long selectedAnswerId;
    private String textAnswer;
}
