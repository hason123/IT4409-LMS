package com.example.backend.controller;

import com.example.backend.dto.request.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.QuizAttemptAnswerResponse;
import com.example.backend.dto.response.QuizAttemptResponse;
import com.example.backend.service.QuizAttemptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;  // ← ADD THIS IMPORT
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms/quiz-attempts")
@RequiredArgsConstructor
@Tag(name = "Quiz Attempt Management", description = "APIs for managing quiz attempts, answers, and submissions")  // ← ADD THIS LINE
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;

    @Operation(summary = "Bắt đầu làm quiz", description = "Allows students to start attempting a quiz. Creates a new quiz attempt record.")  // ← ENHANCED DESCRIPTION
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/quiz/{quizId}/start")
    public ResponseEntity<QuizAttemptResponse> startQuizAttempt(
            @PathVariable Integer quizId
    ) {
        return ResponseEntity.ok(quizAttemptService.startQuizAttempt(quizId));
    }

    @Operation(summary = "Trả lời một câu hỏi trong quiz", description = "Submit an answer for a specific question within an ongoing quiz attempt.")  // ← ENHANCED DESCRIPTION
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{attemptId}/question/{questionId}/answer")
    public ResponseEntity<QuizAttemptAnswerResponse> answerQuestion(
            @PathVariable Long attemptId,
            @PathVariable Long questionId,
            @RequestBody QuizAttemptAnswerRequest request
    ) {
        return ResponseEntity.ok(
                quizAttemptService.answerQuestion(attemptId, questionId, request)
        );
    }

    @Operation(summary = "Nộp bài quiz", description = "Finalize and submit a quiz attempt. Calculates final score and marks attempt as completed.")  // ← ENHANCED DESCRIPTION
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{attemptId}/submit")
    public ResponseEntity<QuizAttemptResponse> submitQuiz(
            @PathVariable Integer attemptId
    ) {
        return ResponseEntity.ok(
                quizAttemptService.submitQuiz(attemptId)
        );
    }
}