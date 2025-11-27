package com.example.backend.dto.request;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class QuizAttemptRequest {
    private Integer quizId;
    private Long studentId;
    private List<QuizAttemptAnswerRequest> answers;
}
