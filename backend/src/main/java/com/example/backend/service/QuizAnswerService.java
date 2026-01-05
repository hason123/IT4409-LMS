package com.example.backend.service;

import com.example.backend.dto.request.QuizAnswerRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizAnswerResponse;
import com.example.backend.entity.QuizAnswer;
import org.springframework.data.domain.Pageable;

public interface QuizAnswerService {
    QuizAnswerResponse createQuizAnswer(Long questionId, QuizAnswerRequest request);
    QuizAnswerResponse getQuizAnswerById(Long id);
    QuizAnswerResponse updateQuizAnswer(Long id, QuizAnswerRequest request);
    void deleteQuizAnswer(Long id);
    
    PageResponse<QuizAnswerResponse> getQuizAnswerPage(Pageable pageable);
    QuizAnswerResponse convertQuizAnswerToDTO(QuizAnswer quizAnswer);
}
