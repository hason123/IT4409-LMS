package com.example.backend.dto.request.course;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {
    private String title;
    private String description;
    private Long teacherId;
    private Long categoryId;
}
