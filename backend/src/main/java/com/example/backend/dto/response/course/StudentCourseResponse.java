package com.example.backend.dto.response.course;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentCourseResponse {
    private Long courseId;
    private List<Long> userIds;
}
