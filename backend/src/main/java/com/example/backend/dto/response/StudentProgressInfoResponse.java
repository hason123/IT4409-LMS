package com.example.backend.dto.response.studentprogress;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgressInfoResponse {
    private Long id;
    private String studentName;
    private String courseTitle;
    private String lessonProgress;
    private String quizProgress;
}
