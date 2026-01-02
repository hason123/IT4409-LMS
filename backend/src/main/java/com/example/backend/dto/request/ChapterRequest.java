package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ChapterRequest {
    private String title;
    private String orderIndex;
    private Long courseId;
    private String description;
}
