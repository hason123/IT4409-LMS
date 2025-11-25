package com.example.backend.dto.response.comment;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentInfoResponse {
    private Integer id;
    private String content;
    private String createdAt;
    private String updatedAt;
    private String userName;
    private String lessonTitle;
    private String quizTitle;
    private String parentUserName;
}
