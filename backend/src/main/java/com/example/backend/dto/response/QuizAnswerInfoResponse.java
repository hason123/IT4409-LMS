package com.example.backend.dto.response.quizanswer;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerInfoResponse {
    private Long id;
    private Boolean isCorrect;
    private String description;
    private String questionTitle;
}
