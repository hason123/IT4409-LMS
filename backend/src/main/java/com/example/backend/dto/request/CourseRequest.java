package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {
    private String title;
    private String descripstion;
    private Long teacherId;
    private Long categoryId;
}
