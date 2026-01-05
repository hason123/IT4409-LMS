package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerResponse {
    private Long id;
    private Boolean isCorrect;
    private String description;

}
