package com.example.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttemptResponse {
    private Long id;
    private LocalDateTime completedTime;
    private Integer grade;
    private Boolean isPassed;
    private Integer quizId;
    private Long studentId;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer incorrectAnswers;
    private Integer unansweredQuestions;
}
