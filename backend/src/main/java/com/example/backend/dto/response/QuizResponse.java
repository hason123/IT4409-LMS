package com.example.backend.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponse {
    private Integer id;
    private String title;
    private String description;
    private Integer minPassScore;
    private List<QuizQuestionResponse> questions;
}
