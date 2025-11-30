package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgressResponse {
    private Long id;
    private String studentName;
    private String courseTitle;
    private String lessonProgress;
    private String quizProgress;
}
