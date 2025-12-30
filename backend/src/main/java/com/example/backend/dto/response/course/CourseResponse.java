package com.example.backend.dto.response.course;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private Long teacherId;
    private String teacherName;
    private String categoryName;
    private String imageUrl;
    private String cloudinaryImageId;
}
