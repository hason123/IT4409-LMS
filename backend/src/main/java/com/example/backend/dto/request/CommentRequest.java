package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CommentRequest {
    private String content;
    private Long userId;
    private Integer lessonId;
    private Integer quizId;
    private Integer parentId;
}
