package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponse {
    private Integer id;
    private String title;
    private String description;
    private Integer minPassScore;
    private Integer maxPassScore;
    //private String chapterTitle;
    private Integer chapterId;
}
