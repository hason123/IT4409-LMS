package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgressResponse {
    private Long id;
    //private String userName;
    private String fullName;
    private String studentNumber;
    private String courseTitle;
    private String lessonProgress;
    private String quizProgress;
}
