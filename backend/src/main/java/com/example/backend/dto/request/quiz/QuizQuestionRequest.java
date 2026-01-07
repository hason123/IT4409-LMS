package com.example.backend.dto.request.quiz;

import com.example.backend.constant.QuestionType;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionRequest {
    private String content;
    private QuestionType type;
    private List<QuizAnswerRequest> answers;
}
