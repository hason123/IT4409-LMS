package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizRequest {
    private String title;
    private String description;
    private Short orderIndex;
    private Integer minPassScore;
    private Integer maxPassScore;
    private Integer chapterId;
}
