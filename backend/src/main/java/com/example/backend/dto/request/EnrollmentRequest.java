package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentRequest {
    private Long studentId;
    private Long courseId;
}
