package com.example.backend.service;

import com.example.backend.dto.request.QuizQuestionRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizQuestionResponse;
import com.example.backend.entity.QuizQuestion;
import org.springframework.data.domain.Pageable;

public interface QuizQuestionService {
    QuizQuestionResponse createQuizQuestion(Integer quizId, QuizQuestionRequest request);
    QuizQuestionResponse getQuizQuestionById(Long id);
    QuizQuestionResponse updateQuizQuestion(Long id, QuizQuestionRequest request);
    void deleteQuizQuestion(Long id);
    
    PageResponse<QuizQuestionResponse> getQuizQuestionPage(Pageable pageable);
    QuizQuestionResponse convertQuizQuestionToDTO(QuizQuestion question);
}
