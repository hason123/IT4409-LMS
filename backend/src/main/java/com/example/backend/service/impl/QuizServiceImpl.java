package com.example.backend.service.impl;

import com.example.backend.dto.request.QuizRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizResponse;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.QuizService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final ChapterRepository chapterRepository;

    public QuizServiceImpl(QuizRepository quizRepository, ChapterRepository chapterRepository){
        this.chapterRepository = chapterRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public QuizResponse convertQuizToDTO(Quiz quiz) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setDescription(quiz.getDescription());
        response.setMinPassScore(quiz.getMinPassScore());
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
    @Transactional
    public QuizResponse createQuiz(QuizRequest request) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setMinPassScore(request.getMinPassScore());
        return convertQuizToDTO(quizRepository.save(quiz));
    }

    @Override
    @Transactional
    public QuizResponse updateQuiz(Integer id, QuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setMinPassScore(request.getMinPassScore());

        return convertQuizToDTO(quizRepository.save(quiz));
    }

    @Override
    @Transactional
    public void deleteQuiz(Integer id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        quizRepository.delete(quiz);
    }
}