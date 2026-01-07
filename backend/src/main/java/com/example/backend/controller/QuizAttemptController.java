package com.example.backend.controller;

import com.example.backend.dto.request.quiz.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.quiz.QuizAttemptResponse;
import com.example.backend.service.QuizAttemptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;  // ← ADD THIS IMPORT
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lms")
@RequiredArgsConstructor
@Tag(name = "Quiz Attempt Management", description = "APIs for managing quiz attempts, answers, and submissions")  // ← ADD THIS LINE
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;

    @Operation(summary = "Bắt đầu làm quiz", description = "Allows students to start attempting a quiz. Creates a new quiz attempt record.")  // ← ENHANCED DESCRIPTION
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/chapterItem/{chapterItemId}/quiz/{quizId}/start")
    public ResponseEntity<QuizAttemptResponse> startQuizAttempt(
            @PathVariable Integer quizId, @PathVariable Integer chapterItemId
    ) {
        return ResponseEntity.ok(quizAttemptService.startQuizAttempt(quizId, chapterItemId));
    }

    @Operation(summary = "Trả lời một câu hỏi trong quiz", description = "Submit an answer for a specific question within an ongoing quiz attempt.")  // ← ENHANCED DESCRIPTION
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{attemptId}/question/{questionId}/answer")
    public ResponseEntity<Void> answerQuestion(
            @PathVariable Integer attemptId,
            @PathVariable Integer questionId,
            @RequestBody QuizAttemptAnswerRequest request
    ) {
        quizAttemptService.answerQuestion(attemptId,questionId,request);
        return ResponseEntity.ok().build();
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

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/chapterItem/{chapterItemId}")
    public ResponseEntity<Integer> getStudentBestScoreOnQuizAttempt(
            @PathVariable Integer chapterItemId
    ) {
        return ResponseEntity.ok(
                quizAttemptService.getStudentBestScore(chapterItemId)
        );
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{attemptId}")
    public ResponseEntity<QuizAttemptResponse> getAttemptDetail(
            @PathVariable Integer attemptId
    ) {
        return ResponseEntity.ok(
                quizAttemptService.getAttemptDetail(attemptId)
        );
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/chapterItem/{chapterItemId}/my-attempts")
    public ResponseEntity<List<QuizAttemptResponse>> getStudentAttemptsHistory(
            @PathVariable Integer chapterItemId
    ) {
        return ResponseEntity.ok(
                quizAttemptService.getStudentAttemptsHistory(chapterItemId)
        );
    }
}