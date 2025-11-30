package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Integer id;
    private String content;
    private String createdAt;
    private String updatedAt;
    private String userName;
    private String lessonTitle;
    private String quizTitle;
    private String parentUserName;
}
