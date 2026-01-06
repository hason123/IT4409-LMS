package com.example.backend.dto.request;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class QuizAttemptRequest {
    private Integer quizId;
    private Integer studentId;
    private Integer chapterItemId;
    private List<QuizAttemptAnswerRequest> answers;
}
