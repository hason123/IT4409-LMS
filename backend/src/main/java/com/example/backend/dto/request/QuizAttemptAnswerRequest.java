package com.example.backend.dto.request;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttemptAnswerRequest {
    private Long questionId;
    private List<Long> selectedAnswerIds;
    //private Long selectedAnswerId;
    private String textAnswer;
}
