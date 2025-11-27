package com.example.backend.dto.request;

import com.example.backend.constant.QuestionType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionRequest {
    private String title;
    private QuestionType type;
    private Long quizId;
}
