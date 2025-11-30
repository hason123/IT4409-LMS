package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonResponse {
    private Long id;
    private String title;
    private String content;
    private Integer orderIndex;
    private String chapterTitle;
}
