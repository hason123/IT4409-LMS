package com.example.backend.service.impl;

import com.example.backend.dto.request.QuizQuestionRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizAnswerResponse;
import com.example.backend.dto.response.QuizQuestionResponse;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.QuizQuestion;
import com.example.backend.repository.QuizQuestionRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.QuizQuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class QuizQuestionServiceImpl implements QuizQuestionService{
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizRepository quizRepository;

    public QuizQuestionServiceImpl(QuizQuestionRepository quizQuestionRepository, QuizRepository quizRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public QuizQuestionResponse convertQuizQuestionToDTO(QuizQuestion question) {
        QuizQuestionResponse response = new QuizQuestionResponse();
        response.setId(question.getId());
        response.setTitle(question.getTitle());
        response.setType(question.getType());

        if (question.getAnswers() != null) {
            response.setAnswers(question.getAnswers().stream().map(answer -> {
                QuizAnswerResponse aDto = new QuizAnswerResponse();
                aDto.setId(answer.getId());
                aDto.setIsCorrect(answer.getIsCorrect());
                aDto.setDescription(answer.getDescription());
                return aDto;
            }).collect(Collectors.toList()));
        } else {
            response.setAnswers(new ArrayList<>());
        }
        
        return response;
    }

    @Override
    public PageResponse<QuizQuestionResponse> getQuizQuestionPage(Pageable pageable) {
        Page<QuizQuestion> questionPage = quizQuestionRepository.findAll(pageable);
        Page<QuizQuestionResponse> responsePage = questionPage.map(this::convertQuizQuestionToDTO);

        return new PageResponse<>(
                responsePage.getNumber() + 1,
                responsePage.getTotalPages(),
                (int) responsePage.getTotalElements(),
                responsePage.getContent()
        );
    }

    @Override
    public QuizQuestionResponse getQuizQuestionById(Long id) {
        QuizQuestion question = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
        return convertQuizQuestionToDTO(question);
    }

    @Override
    @Transactional
    public QuizQuestionResponse createQuizQuestion(Integer quizId, QuizQuestionRequest request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));

        QuizQuestion question = new QuizQuestion();
        question.setTitle(request.getTitle());
        question.setType(request.getType());
        question.setQuiz(quiz);

        return convertQuizQuestionToDTO(quizQuestionRepository.save(question));
    }

    @Override
    @Transactional
    public QuizQuestionResponse updateQuizQuestion(Long id, QuizQuestionRequest request) {
        QuizQuestion question = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        question.setTitle(request.getTitle());
        question.setType(request.getType());

        return convertQuizQuestionToDTO(quizQuestionRepository.save(question));
    }

    @Override
    @Transactional
    public void deleteQuizQuestion(Long id) {
        QuizQuestion question = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        quizQuestionRepository.delete(question);
    }
}
