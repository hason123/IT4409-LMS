package com.example.backend.service.impl;

import com.example.backend.dto.request.QuizRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizResponse;
import com.example.backend.dto.response.QuizQuestionResponse;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.QuizService;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    public QuizServiceImpl(QuizRepository quizRepository){
        this.quizRepository = quizRepository;
    }

    @Override
    public QuizResponse convertQuizToDTO(Quiz quiz) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setDescription(quiz.getDescription());
        response.setMinPassScore(quiz.getMinPassScore());
        response.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        if (quiz.getQuestions() != null) {
            response.setQuestions(quiz.getQuestions().stream()
                .map(question -> {
                    QuizQuestionResponse qDto = new QuizQuestionResponse();
                    qDto.setId(question.getId());
                    qDto.setTitle(question.getTitle());
                    qDto.setType(question.getType());
                    return qDto;
                })
                .collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public PageResponse<QuizResponse> getQuizPage(Pageable pageable) {
        Page<Quiz> quizPage = quizRepository.findAll(pageable);
        Page<QuizResponse> quizResponsePage = quizPage.map(this::convertQuizToDTO);

        return new PageResponse<>(
                quizResponsePage.getNumber() + 1,
                quizResponsePage.getTotalPages(),
                (int) quizResponsePage.getTotalElements(),
                quizResponsePage.getContent()
        );
    }

    @Override
    public QuizResponse getQuizById(Integer id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
        return convertQuizToDTO(quiz);
    }

    @Override
    public QuizResponse createQuiz(QuizRequest request) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setMinPassScore(request.getMinPassScore());
        quiz.setTimeLimitMinutes(request.getTimeLimitMinutes());
        return convertQuizToDTO(quizRepository.save(quiz));
    }

    @Override
    public QuizResponse updateQuiz(Integer id, QuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        if(request.getTitle() != null){
            quiz.setTitle(request.getTitle());
        }
        if(request.getDescription() != null){
            quiz.setDescription(request.getDescription());
        }
        if(request.getMinPassScore() != null){
            quiz.setMinPassScore(request.getMinPassScore());
        }
        if(request.getTimeLimitMinutes() != null){
            quiz.setTimeLimitMinutes(request.getTimeLimitMinutes());
        }
        return convertQuizToDTO(quizRepository.save(quiz));
    }

    @Override
    public void deleteQuiz(Integer id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        quizRepository.delete(quiz);
    }
}