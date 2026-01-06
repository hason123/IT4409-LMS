package com.example.backend.dto.response.quiz;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerResponse {
    private Integer id;
    private Boolean isCorrect;
    private String description;
}
