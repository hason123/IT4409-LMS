package com.example.backend.dto.response.course;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Integer id;
    private String title;
    private String description;
    private Integer teacherId;
    private String teacherName;
    private Integer categoryId;
    private String categoryName;
    private String imageUrl;
    private String cloudinaryImageId;
    private String classCode;
}
