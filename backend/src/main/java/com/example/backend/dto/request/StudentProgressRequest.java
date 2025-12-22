package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgressRequest {
    private Long studentId;
    private Long courseId;
}
