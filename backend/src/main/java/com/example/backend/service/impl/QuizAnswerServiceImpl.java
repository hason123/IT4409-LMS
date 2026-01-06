package com.example.backend.service.impl;

import com.example.backend.constant.QuestionType;
import com.example.backend.dto.request.QuizAnswerRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.QuizAnswerResponse;
import com.example.backend.entity.QuizAnswer;
import com.example.backend.entity.QuizQuestion;
import com.example.backend.repository.QuizAnswerRepository;
import com.example.backend.repository.QuizQuestionRepository;
import com.example.backend.service.QuizAnswerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizAnswerServiceImpl implements QuizAnswerService{
    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    public QuizAnswerServiceImpl(QuizAnswerRepository quizAnswerRepository, QuizQuestionRepository quizQuestionRepository) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Override
    public QuizAnswerResponse convertQuizAnswerToDTO(QuizAnswer quizAnswer) {
        QuizAnswerResponse response = new QuizAnswerResponse();
        response.setId(quizAnswer.getId());
        response.setIsCorrect(quizAnswer.getIsCorrect());
        response.setDescription(quizAnswer.getDescription());
        return response;
    }

    @Override
    public PageResponse<QuizAnswerResponse> getQuizAnswerPage(Pageable pageable) {
        Page<QuizAnswer> answerPage = quizAnswerRepository.findAll(pageable);
        Page<QuizAnswerResponse> responsePage = answerPage.map(this::convertQuizAnswerToDTO);

        return new PageResponse<>(
                responsePage.getNumber() + 1,
                responsePage.getTotalPages(),
                (int) responsePage.getTotalElements(),
                responsePage.getContent()
        );
    }

    @Override
    public QuizAnswerResponse getQuizAnswerById(Long id) {
        QuizAnswer answer = quizAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz Answer not found with id: " + id));
        return convertQuizAnswerToDTO(answer);
    }

    @Override
    @Transactional
    public QuizAnswerResponse createQuizAnswer(Long questionId, QuizAnswerRequest request) {
        QuizQuestion question = quizQuestionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Quiz Question not found with id: " + questionId));

        QuizAnswer answer = new QuizAnswer();
        answer.setQuizQuestion(question);
        if(question.getType().equals(QuestionType.MULTIPLE_CHOICE)){
            answer.setDescription(request.getDescription());
            answer.setIsCorrect(request.getIsCorrect());
        }
        if(question.getType().equals(QuestionType.TEXT)){
            boolean exists = quizAnswerRepository.existsByQuizQuestion_Id(questionId);
            if (exists) {
                throw new RuntimeException("TEXT question can only have one answer");
            }
            answer.setDescription(request.getDescription());
            answer.setIsCorrect(true);
        }

        return convertQuizAnswerToDTO(quizAnswerRepository.save(answer));
    }

    @Override
    @Transactional
    public QuizAnswerResponse updateQuizAnswer(Long id, QuizAnswerRequest request) {
        QuizAnswer answer = quizAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz Answer not found with id: " + id));

        if(answer.getQuizQuestion().getType().equals(QuestionType.MULTIPLE_CHOICE)){
            if(request.getDescription() != null){
                answer.setDescription(request.getDescription());
            }
            if(request.getIsCorrect() != null){
                answer.setIsCorrect(request.getIsCorrect());
            }
        }
        if(answer.getQuizQuestion().getType().equals(QuestionType.TEXT)){
            if(request.getDescription() != null){
                answer.setDescription(request.getDescription());
            }
            answer.setIsCorrect(true);
        }

        return convertQuizAnswerToDTO(quizAnswerRepository.save(answer));
    }

    @Override
    @Transactional
    public void deleteQuizAnswer(Long id) {
        QuizAnswer answer = quizAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz Answer not found with id: " + id));
        
        quizAnswerRepository.delete(answer);
    }
}
