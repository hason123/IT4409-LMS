package com.example.backend.dto.response.quizattempt;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptInfoResponse {
    private Long id;
    private String completedTime;
    private Integer grade;
    private Boolean isPassed;
    private String quizTitle;
    private String studentName;
}
