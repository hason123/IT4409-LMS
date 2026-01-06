package com.example.backend.service;

import com.example.backend.dto.request.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.QuizAttemptAnswerResponse;
import com.example.backend.dto.response.QuizAttemptResponse;
import org.springframework.transaction.annotation.Transactional;

public interface QuizAttemptService {
    // Taking quizz
    @Transactional
    QuizAttemptResponse startQuizAttempt(Integer quizId);
    /*@Transactional
    QuizAttemptResponse startQuizAttempt(Integer quizId, Integer courseId);*/
    @Transactional
    QuizAttemptAnswerResponse answerQuestion(Long attemptId, Long questionId, QuizAttemptAnswerRequest request);

    @Transactional
    QuizAttemptResponse submitQuiz(Integer attemptId);
}
