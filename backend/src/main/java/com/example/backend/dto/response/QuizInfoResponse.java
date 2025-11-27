package com.example.backend.dto.response.quiz;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizInfoResponse {
    private Integer id;
    private String title;
    private String description;
    private Short orderIndex;
    private Integer minPassScore;
    private Integer maxPassScore;
    private String chapterTitle;
}
