package com.example.backend.service.impl;

import com.example.backend.constant.AttemptStatus;
import com.example.backend.constant.QuestionType;
import com.example.backend.dto.request.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.QuizAnswerResponse;
import com.example.backend.dto.response.QuizAttemptAnswerResponse;
import com.example.backend.dto.response.QuizAttemptResponse;
import com.example.backend.dto.response.QuizQuestionResponse;
import com.example.backend.entity.*;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.*;
import com.example.backend.service.QuizAttemptService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizRepository quizRepository;
    private final UserService userService;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ChapterItemRepository chapterItemRepository;

    // Taking quizz
    @Override
    public QuizAttemptResponse startQuizAttempt(Integer quizId) {
        Quiz chosenQuiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        User currentUser = userService.getCurrentUser();
        if(!userService.isCurrentUser(currentUser.getId())) {
            throw new UnauthorizedException("You have no permission");
        }
//        ChapterItem quizItem = chapterItemRepository.findByRefId(quizId);
//        Enrollment progress = enrollmentRepository.findByStudent_IdAndCourse_Id(currentUser.getId(),
//                quizItem.getChapter().getCourse().getId());
        QuizAttempt attempt = QuizAttempt.builder()
                .quiz(chosenQuiz)
                .student(currentUser)
                .grade(0)
                .isPassed(false)
                .totalQuestions(chosenQuiz.getQuestions().size())
                .unansweredQuestions(chosenQuiz.getQuestions().size())
                .incorrectAnswers(0)
                .correctAnswers(0)
                .startTime(LocalDateTime.now())
                .build();

        quizAttemptRepository.save(attempt);

        for (QuizQuestion question : chosenQuiz.getQuestions()) {
            QuizAttemptAnswer attemptAnswer = new QuizAttemptAnswer();
            attemptAnswer.setAttempt(attempt);
            attemptAnswer.setQuestion(question);
            quizAttemptAnswerRepository.save(attemptAnswer);
        }

        return convertQuizAttemptToDTO(attempt);

    }

    @Override
    @Transactional
    public QuizAttemptAnswerResponse answerQuestion(Long attemptId, Long questionId, QuizAttemptAnswerRequest request) {
        log.info("Answering question {} in attempt {}", questionId, attemptId);

        QuizAttempt attempt = quizAttemptRepository.findById((attemptId))
                .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

        User currentUser = userService.getCurrentUser();
        if (!attempt.getStudent().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not owner of this attempt");
        }

        // Check time limit
        if (isAttemptExpired(attempt)) {
            expireAttempt(attempt);
            throw new BusinessException("Time's out!");
        }
        // Find attempt answer
        QuizAttemptAnswer attemptAnswer = quizAttemptAnswerRepository
                .findByAttempt_IdAndQuestion_Id(attemptId, questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Answer attempt not found"));

        QuizQuestion question = attemptAnswer.getQuestion();

/*        boolean wasAnswered =
                attemptAnswer.getSelectedAnswer() != null
                        || attemptAnswer.getTextAnswer() != null;*/

        // ===== MULTIPLE CHOICE (MULTI ANSWER) =====
        if (question.getType() == QuestionType.MULTIPLE_CHOICE) {

            if (request.getSelectedAnswerIds() == null || request.getSelectedAnswerIds().isEmpty()) {
                throw new BusinessException("Selected answers are required");
            }

            List<QuizAnswer> selectedAnswers =
                    quizAnswerRepository.findAllById(request.getSelectedAnswerIds());

            if (selectedAnswers.size() != request.getSelectedAnswerIds().size()) {
                throw new BusinessException("Some answers not found");
            }

            // Validate answers belong to question
            for (QuizAnswer ans : selectedAnswers) {
                if (!ans.getQuizQuestion().getId().equals(questionId)) {
                    throw new BusinessException("Invalid answer for question");
                }
            }

            attemptAnswer.setSelectedAnswers(selectedAnswers);
            attemptAnswer.setTextAnswer(null);
        }

        // ===== TEXT =====
        else if (question.getType() == QuestionType.TEXT) {

            if (request.getTextAnswer() == null || request.getTextAnswer().trim().isEmpty()) {
                throw new BusinessException("Text answer is required");
            }

            attemptAnswer.setTextAnswer(request.getTextAnswer().trim());
            attemptAnswer.setSelectedAnswers(null);
        }

        attemptAnswer.setCompletedAt(LocalDateTime.now());
        quizAttemptAnswerRepository.save(attemptAnswer);

//        if (!wasAnswered) {
//            updateAttemptStatistics(attempt);
//        }

        log.info("Question answered successfully");
        return convertQuizAttemptAnswerToDTO(attemptAnswer);
    }

    @Override
    @Transactional
    public QuizAttemptResponse submitQuiz(Integer attemptId) {
        log.info("Submitting quiz attempt {}", attemptId);

        QuizAttempt attempt = quizAttemptRepository.findById(Long.valueOf(attemptId))
                .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

        User currentUser = userService.getCurrentUser();
        if (!attempt.getStudent().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not owner of this attempt");
        }
        // Check if already submitted
        if (attempt.getCompletedTime() != null) {
            throw new BusinessException("Quiz attempt already submitted");
        }
        // Check time limit
        if (isAttemptExpired(attempt)) {
            expireAttempt(attempt);
            return convertQuizAttemptToDTO(attempt);
        }
        updateAttemptStatistics(attempt);
        attempt.setCompletedTime(LocalDateTime.now());
        Integer passingScore = attempt.getQuiz().getMinPassScore(); // nếu có
//        if (passingScore == null) {
//            passingScore = 50; // default
//        }
        attempt.setIsPassed(attempt.getGrade() >= passingScore);
        quizAttemptRepository.save(attempt);
        log.info("Quiz submitted successfully. Grade = {}, Passed = {}",
                attempt.getGrade(), attempt.getIsPassed());
        return convertQuizAttemptToDTO(attempt);
    }

    //Hàm tính kết quả
    private void updateAttemptStatistics(QuizAttempt attempt) {

        List<QuizAttemptAnswer> attemptAnswers =
                quizAttemptAnswerRepository.findByAttempt_Id(attempt.getId());

        int answered = 0;
        int correct = 0;
        int incorrect = 0;

        for (QuizAttemptAnswer submitAnswer : attemptAnswers) {

            QuizQuestion question = submitAnswer.getQuestion();

            // ===== TEXT QUESTION =====
            if (question.getType() == QuestionType.TEXT) {
                String userAnswer = submitAnswer.getTextAnswer();
                if (userAnswer != null && !userAnswer.trim().isEmpty()) {
                    answered++;
                    // TEXT chỉ có 1 đáp án đúng
                    QuizAnswer correctAnswer = question.getAnswers().get(0);

                    boolean isCorrect = correctAnswer.getDescription()
                            .trim()
                            .equalsIgnoreCase(userAnswer.trim());

                    submitAnswer.setIsCorrect(isCorrect);
                    if (isCorrect) correct++;
                    else incorrect++;
                }
            }
            // Multiple choices
            else if (question.getType() == QuestionType.MULTIPLE_CHOICE) {

                List<QuizAnswer> selectedAnswers = submitAnswer.getSelectedAnswers();

                if (selectedAnswers != null && !selectedAnswers.isEmpty()) {

                    answered++;

                    var correctIds = question.getAnswers().stream()
                            .filter(a -> Boolean.TRUE.equals(a.getIsCorrect()))
                            .map(QuizAnswer::getId)
                            .collect(java.util.stream.Collectors.toSet());

                    var selectedIds = selectedAnswers.stream()
                            .map(QuizAnswer::getId)
                            .collect(java.util.stream.Collectors.toSet());

                    boolean isCorrect = correctIds.equals(selectedIds);
                    submitAnswer.setIsCorrect(isCorrect);

                    if (isCorrect) correct++;
                    else incorrect++;
                }
            }

        }

        attempt.setCorrectAnswers(correct);
        attempt.setIncorrectAnswers(incorrect);
        attempt.setUnansweredQuestions(attempt.getTotalQuestions() - answered);
        if (attempt.getTotalQuestions() > 0) {
            attempt.setGrade(correct * 100 / attempt.getTotalQuestions());
        } else {
            attempt.setGrade(0);
        }
        quizAttemptRepository.save(attempt);
    }


    private boolean isAttemptExpired(QuizAttempt attempt) {
        if (attempt.getQuiz().getTimeLimitMinutes() == null) {
            return false; // No time limit
        }
        LocalDateTime expirationTime = attempt.getStartTime()
                .plusMinutes(attempt.getQuiz().getTimeLimitMinutes());
        return LocalDateTime.now().isAfter(expirationTime);
    }

    private void expireAttempt(QuizAttempt attempt) {
        updateAttemptStatistics(attempt);
        attempt.setCompletedTime(LocalDateTime.now());
        Integer passingScore = attempt.getQuiz().getMinPassScore();
//        if (passingScore == null) {
//            passingScore = 50; // default
//        }
        attempt.setIsPassed(attempt.getGrade() >= passingScore);
        quizAttemptRepository.save(attempt);
    }

    private QuizAttemptAnswerResponse convertQuizAttemptAnswerToDTO(QuizAttemptAnswer entity) {
        if (entity == null) return null;

        QuizAttemptAnswerResponse response = new QuizAttemptAnswerResponse();
        response.setId(entity.getId());
        response.setQuizQuestion(convertQuizQuestionToDTO(entity.getQuestion()));

        if (entity.getQuestion().getType() == QuestionType.TEXT) {
            response.setTextAnswer(entity.getTextAnswer());
            response.setSelectedAnswers(null);
        } else {
            response.setSelectedAnswers(
                    entity.getSelectedAnswers() == null
                            ? List.of()
                            : entity.getSelectedAnswers().stream()
                            .map(this::convertQuizAnswerToDTO)
                            .toList()
            );
            response.setTextAnswer(null);
        }
        return response;
    }


    private QuizQuestionResponse convertQuizQuestionToDTO(QuizQuestion question) {
        if (question == null) return null;
        QuizQuestionResponse response = new QuizQuestionResponse();
        response.setId(question.getId());
        response.setTitle(question.getTitle());
        response.setType(question.getType());
        if (question.getAnswers() != null) {
            response.setAnswers(
                    question.getAnswers().stream()
                            .map(this::convertQuizAnswerToDTO)
                            .toList()
            );
        }
        return response;
    }
    private QuizAnswerResponse convertQuizAnswerToDTO(QuizAnswer quizAnswer) {
        QuizAnswerResponse response = new QuizAnswerResponse();
        response.setId(quizAnswer.getId());
        response.setIsCorrect(quizAnswer.getIsCorrect());
        response.setDescription(quizAnswer.getDescription());
        return response;
    }

    private QuizAttemptResponse convertQuizAttemptToDTO(QuizAttempt attempt) {
        if (attempt == null) return null;
        return QuizAttemptResponse.builder()
                .id(attempt.getId())
                .completedTime(attempt.getCompletedTime())
                .grade(attempt.getGrade())
                .isPassed(attempt.getIsPassed())
                .quizId(
                        attempt.getQuiz() != null
                                ? attempt.getQuiz().getId()
                                : null
                )
                .studentId(
                        attempt.getStudent() != null
                                ? attempt.getStudent().getId()
                                : null
                )
                .totalQuestions(attempt.getTotalQuestions())
                .correctAnswers(attempt.getCorrectAnswers())
                .incorrectAnswers(attempt.getIncorrectAnswers())
                .unansweredQuestions(attempt.getUnansweredQuestions())
                .build();
    }

}
