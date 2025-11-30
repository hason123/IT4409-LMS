package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptResponse {
    private Long id;
    private String completedTime;
    private Integer grade;
    private Boolean isPassed;
    private String quizTitle;
    private String studentName;
}
