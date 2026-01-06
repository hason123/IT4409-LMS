package com.example.backend.dto.request;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttemptAnswerRequest {
    private Integer questionId;
    private List<Integer> selectedAnswerIds;
    //private Integer selectedAnswerId;
    private String textAnswer;
}
