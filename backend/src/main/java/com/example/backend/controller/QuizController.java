package com.example.backend.controller;

import com.example.backend.dto.request.QuizRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizResponse;
import com.example.backend.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @Operation(summary = "Tạo quiz mới")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(@RequestBody QuizRequest request) {
        return ResponseEntity.ok(quizService.createQuiz(request));
    }

    @Operation(summary = "Lấy thông tin quiz theo ID")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/{id}")
    public ResponseEntity<QuizResponse> getQuizById(@PathVariable Integer id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @Operation(summary = "Lấy danh sách quiz có phân trang")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping
    public ResponseEntity<PageResponse<QuizResponse>> getAllQuizzes(
            @RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<QuizResponse> quizPage = quizService.getQuizPage(pageable);
        return ResponseEntity.ok(quizPage);
    }

    @Operation(summary = "Cập nhật quiz")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/{id}")
    public ResponseEntity<QuizResponse> updateQuiz(
            @PathVariable Integer id,
            @RequestBody QuizRequest request
    ) {
        return ResponseEntity.ok(quizService.updateQuiz(id, request));
    }

    @Operation(summary = "Xóa quiz")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Integer id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }
}