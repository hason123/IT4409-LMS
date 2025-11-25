package com.example.backend.dto.response.lesson;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonInfoResponse {
    private Long id;
    private String title;
    private String content;
    private Integer orderIndex;
    private String chapterTitle;
}
