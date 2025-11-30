package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String teacherName;
    private String categoryName;
}
