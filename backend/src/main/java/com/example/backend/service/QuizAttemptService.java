package com.example.backend.service;

import com.example.backend.dto.request.quiz.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.quiz.QuizAttemptDetailResponse;
import com.example.backend.dto.response.quiz.QuizAttemptResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuizAttemptService {
    // Taking quizz
    @Transactional
    QuizAttemptResponse startQuizAttempt(Integer quizId, Integer chapterItemId);

    /*@Transactional
        QuizAttemptResponse startQuizAttempt(Integer quizId, Integer courseId);*/
    @Transactional
    void answerQuestion(Integer attemptId, Integer questionId, QuizAttemptAnswerRequest request);

    @Transactional
    QuizAttemptResponse submitQuiz(Integer attemptId);

    List<QuizAttemptResponse> getStudentAttemptsHistory(Integer chapterItemId);

    Integer getStudentBestScore(Integer chapterItemId);

    QuizAttemptDetailResponse getAttemptDetail(Integer attemptId);
}
