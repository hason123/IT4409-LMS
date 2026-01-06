package com.example.backend.dto.response.quiz;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttemptAnswerResponse {
    private Integer id;
    private QuizQuestionResponse quizQuestion;
    private List<QuizAnswerResponse> selectedAnswers;
    private String textAnswer;

}
