package com.example.backend.dto.response.course;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseInfoResponse {
    private Long id;
    private String title;
    private String description;
    private String teacherName;
    private String categoryName;
}
