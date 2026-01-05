package com.example.backend.controller;

import com.example.backend.dto.request.QuizQuestionRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizQuestionResponse;
import com.example.backend.service.QuizQuestionService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms/quiz-questions")
public class QuizQuestionController {
    private final QuizQuestionService quizQuestionService;

    public QuizQuestionController(QuizQuestionService quizQuestionService) {
        this.quizQuestionService = quizQuestionService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/quiz/{quizId}")
    public ResponseEntity<QuizQuestionResponse> createQuizQuestion(
            @PathVariable Integer quizId,
            @RequestBody QuizQuestionRequest request) {
        return ResponseEntity.ok(quizQuestionService.createQuizQuestion(quizId, request));
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/{id}")
    public ResponseEntity<QuizQuestionResponse> getQuizQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(quizQuestionService.getQuizQuestionById(id));
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping
    public ResponseEntity<PageResponse<QuizQuestionResponse>> getAllQuizQuestions(
            @RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        return ResponseEntity.ok(quizQuestionService.getQuizQuestionPage(pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<QuizQuestionResponse> updateQuizQuestion(
            @PathVariable Long id,
            @RequestBody QuizQuestionRequest request
    ) {
        return ResponseEntity.ok(quizQuestionService.updateQuizQuestion(id, request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizQuestion(@PathVariable Long id) {
        quizQuestionService.deleteQuizQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
