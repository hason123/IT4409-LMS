package com.example.backend.controller;
import com.example.backend.dto.request.QuizAnswerRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizAnswerResponse;
import com.example.backend.service.QuizAnswerService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms/quiz-answers")
public class QuizAnswerController {

    private final QuizAnswerService quizAnswerService;
    public QuizAnswerController(QuizAnswerService quizAnswerService) {
        this.quizAnswerService = quizAnswerService;
    }

    @Operation(summary = "Tạo câu trả lời cho câu hỏi quiz")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/question/{questionId}")
    public ResponseEntity<QuizAnswerResponse> createQuizAnswer(
            @PathVariable Long questionId,
            @RequestBody QuizAnswerRequest request) {
        return ResponseEntity.ok(quizAnswerService.createQuizAnswer(questionId, request));
    }

    @Operation(summary = "Lấy thông tin câu trả lời quiz theo ID")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/{id}")
    public ResponseEntity<QuizAnswerResponse> getQuizAnswerById(@PathVariable Long id) {
        return ResponseEntity.ok(quizAnswerService.getQuizAnswerById(id));
    }

    @Operation(summary = "Lấy danh sách câu trả lời quiz có phân trang")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping
    public ResponseEntity<PageResponse<QuizAnswerResponse>> getAllQuizAnswers(
            @RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        return ResponseEntity.ok(quizAnswerService.getQuizAnswerPage(pageable));
    }

    @Operation(summary = "Cập nhật câu trả lời quiz")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/{id}")
    public ResponseEntity<QuizAnswerResponse> updateQuizAnswer(
            @PathVariable Long id,
            @RequestBody QuizAnswerRequest request
    ) {
        return ResponseEntity.ok(quizAnswerService.updateQuizAnswer(id, request));
    }

    @Operation(summary = "Xóa câu trả lời quiz")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizAnswer(@PathVariable Long id) {
        quizAnswerService.deleteQuizAnswer(id);
        return ResponseEntity.noContent().build();
    }
}