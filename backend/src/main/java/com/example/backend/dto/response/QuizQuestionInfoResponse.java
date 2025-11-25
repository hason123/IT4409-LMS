package com.example.backend.dto.response.quizquestion;

import com.example.backend.constant.QuestionType;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionInfoResponse {
    private Long id;
    private String title;
    private QuestionType type;
    private String quizTitle;
    private List<QuizAnswerSummary> answers;
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizAnswerSummary {
        private Long id;
        private String description;
    }
}
