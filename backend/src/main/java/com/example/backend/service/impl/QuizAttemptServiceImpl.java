package com.example.backend.service.impl;

import com.example.backend.constant.AttemptStatus;
import com.example.backend.constant.ItemType;
import com.example.backend.constant.QuestionType;
import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.quiz.QuizAttemptAnswerRequest;
import com.example.backend.dto.response.quiz.*;
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
import java.util.Optional;
import java.util.stream.Collectors;

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

    // Taking quiz
    @Override
    public QuizAttemptResponse startQuizAttempt(Integer quizId, Integer chapterItemId) {
        User currentUser = userService.getCurrentUser();
        if(!userService.isCurrentUser(currentUser.getId())) {
            throw new UnauthorizedException("Chỉ học sinh đăng ký khóa học mới được truy cập vào nội dung này");
        }

        // 2. Tìm ChapterItem và Validate
        ChapterItem chapterItem = chapterItemRepository.findById(chapterItemId)
                .orElseThrow(() -> new BusinessException("Quiz chưa được thêm vào chương tương ứng"));

        // Validate: Đảm bảo chapterItem này trỏ đúng tới quizId đang request
        if (chapterItem.getType() != ItemType.QUIZ || !chapterItem.getRefId().equals(quizId)) {
            throw new BusinessException("Quiz không tồn tại");
        }

        // 3. Tìm Quiz
        Quiz chosenQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz không tồn tại"));

        Optional<QuizAttempt> inProgressAttempt = quizAttemptRepository.findByChapterItem_IdAndStudent_IdAndStatus(
                chapterItem.getId(), currentUser.getId(), AttemptStatus.IN_PROGRESS);

        if(inProgressAttempt.isPresent()){
            return convertQuizAttemptToDTO(inProgressAttempt.get());
        }

        int currentAttempt = quizAttemptRepository.countByChapterItem_IdAndStudent_Id(chapterItem.getId(), currentUser.getId());
        if(chosenQuiz.getMaxAttempts() != null && currentAttempt >= chosenQuiz.getMaxAttempts()){
            throw new BusinessException("Đã vượt quá số lần làm bài!");
        }

        QuizAttempt attempt = QuizAttempt.builder()
                .quiz(chosenQuiz)
                .student(currentUser)
                .chapterItem(chapterItem)
                .attemptNumber(currentAttempt + 1)
                .grade(0)
                .isPassed(false)
                .totalQuestions(chosenQuiz.getQuestions().size())
                .unansweredQuestions(chosenQuiz.getQuestions().size())
                .incorrectAnswers(0)
                .correctAnswers(0)
                .startTime(LocalDateTime.now())
                .status(AttemptStatus.IN_PROGRESS)
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
    public void answerQuestion(Integer attemptId, Integer questionId, QuizAttemptAnswerRequest request) {
        log.info("Answering question {} in attempt {}", questionId, attemptId);

        QuizAttempt attempt = quizAttemptRepository.findById((attemptId))
                .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

        User currentUser = userService.getCurrentUser();
        if (!attempt.getStudent().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Chỉ học sinh đăng ký khóa học mới được truy cập vào nội dung này");
        }

        // Check time limit
        if (isAttemptExpired(attempt)) {
            expireAttempt(attempt);
            throw new BusinessException("Đã hết thời gian làm bài!");
        }
        // Find attempt answer
        QuizAttemptAnswer attemptAnswer = quizAttemptAnswerRepository
                .findByAttempt_IdAndQuestion_Id(attemptId, questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Answer attempt not found"));

        QuizQuestion question = attemptAnswer.getQuestion();

/*       boolean wasAnswered =
                attemptAnswer.getSelectedAnswers() != null
                        || attemptAnswer.getTextAnswer() != null;*/

        // ===== MULTIPLE CHOICE (MULTI ANSWER) =====
        if (question.getType() == QuestionType.MULTIPLE_CHOICE) {

/*            if (request.getSelectedAnswerIds() == null || request.getSelectedAnswerIds().isEmpty()) {
                throw new BusinessException("Bạn cần chọn ít nhất một phương án");
            }*/

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

            // ===== CHECK CORRECT =====
/*            Set<Integer> correctIds = question.getAnswers()
                    .stream()
                    .filter(QuizAnswer::getIsCorrect)
                    .map(QuizAnswer::getId)
                    .collect(Collectors.toSet());

            Set<Integer> selectedIds = selectedAnswers
                    .stream()
                    .map(QuizAnswer::getId)
                    .collect(Collectors.toSet());


            boolean isCorrect = correctIds.equals(selectedIds);*/

            attemptAnswer.setSelectedAnswers(selectedAnswers);
            attemptAnswer.setTextAnswer(null);
           // attemptAnswer.setIsCorrect(isCorrect);
        }


        // ===== TEXT =====
        else if (question.getType() == QuestionType.TEXT) {

/*            if (request.getTextAnswer() == null || request.getTextAnswer().trim().isEmpty()) {
                throw new BusinessException("Bạn cần trả lời câu hỏi này");
            }*/

            String userAnswer = request.getTextAnswer().trim();
/*            QuizAnswer correctAnswer = question.getAnswers().get(0); // only 1 correct

            boolean isCorrect = correctAnswer.getDescription()
                    .trim()
                    .equalsIgnoreCase(userAnswer);*/

            attemptAnswer.setTextAnswer(userAnswer);
            attemptAnswer.setSelectedAnswers(null);
            //attemptAnswer.setIsCorrect(isCorrect);
        }

        attemptAnswer.setCompletedAt(LocalDateTime.now());
        quizAttemptAnswerRepository.save(attemptAnswer);

      /*  if (!wasAnswered) {
            updateAttemptStatistics(attempt);
        }*/

        log.info("Question answered successfully");
        //return convertQuizAttemptAnswerToDTO(attemptAnswer);
    }

    @Override
    @Transactional
    public QuizAttemptResponse submitQuiz(Integer attemptId) {
        log.info("Submitting quiz attempt {}", attemptId);

        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

        User currentUser = userService.getCurrentUser();
        if (!attempt.getStudent().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Chỉ học sinh đăng ký khóa học mới được truy cập vào nội dung này");
        }
        // Check if already submitted
        if (attempt.getCompletedTime() != null) {
            throw new BusinessException("Bạn đã nộp bài rồi!");
        }
        // Check time limit
        if (isAttemptExpired(attempt)) {
            expireAttempt(attempt);
            return convertQuizAttemptToDTO(attempt);
        }

        updateAttemptStatistics(attempt);
        attempt.setCompletedTime(LocalDateTime.now());
        Integer passingScore = attempt.getQuiz().getMinPassScore();
        attempt.setIsPassed(attempt.getGrade() >= passingScore);
        attempt.setStatus(AttemptStatus.COMPLETED);
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
        quizAttemptAnswerRepository.saveAll(attemptAnswers);
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
        attempt.setStatus(AttemptStatus.EXPIRED);
        Integer passingScore = attempt.getQuiz().getMinPassScore();
        attempt.setIsPassed(attempt.getGrade() >= passingScore);
        quizAttemptRepository.save(attempt);
    }

    @Override
    public List<QuizAttemptResponse> getStudentAttemptsHistory(Integer chapterItemId) {
        User currentUser = userService.getCurrentUser();
        ChapterItem chapterItem = chapterItemRepository.findById(chapterItemId).orElse(null);
        if (chapterItem == null) {
            throw new RuntimeException("Chapter Item not found");
        }
        Integer teacherCourseId = chapterItem.getChapter().getCourse().getTeacher().getId();

        boolean isAdmin =
                currentUser.getRole().getRoleName() == RoleType.ADMIN;
        boolean isTeacher =
                teacherCourseId.equals(currentUser.getId());
        if (!isAdmin && !isTeacher) {
            throw new UnauthorizedException("Bạn không có quyền xem bài làm này");
        }

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByChapterItem_IdAndStudent_Id(
                        chapterItemId, currentUser.getId()
                );
        return attempts.stream()
                .filter(attempt ->
                        attempt.getStatus() == AttemptStatus.COMPLETED
                                || attempt.getStatus() == AttemptStatus.EXPIRED
                )
                .map(this::convertQuizAttemptToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public Integer getStudentBestScore(Integer chapterItemId) {
        User currentUser = userService.getCurrentUser();

        Integer maxGrade = quizAttemptRepository.findMaxGradeByChapterItemAndStudent(
                chapterItemId,
                currentUser.getId()
        );

        return maxGrade == null ? 0 : maxGrade;
    }

    @Override
    public QuizAttemptDetailResponse getAttemptDetail(Integer attemptId) {

        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

        Integer teacherCourseId = attempt.getChapterItem().getChapter().getCourse().getTeacher().getId();
        User currentUser = userService.getCurrentUser();

        boolean isStudent = attempt.getStudent().getId().equals(currentUser.getId());
        boolean isTeacher = teacherCourseId.equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole().getRoleName() == RoleType.ADMIN;

        if (!(isStudent || isTeacher || isAdmin)) {
            throw new UnauthorizedException("Bạn không có quyền xem bài làm này");
        }

        QuizAttemptDetailResponse response = new QuizAttemptDetailResponse();
        // dùng lại mapper cũ
        QuizAttemptResponse base = convertQuizAttemptToDTO(attempt);

        // copy field từ parent
        response.setId(base.getId());
        response.setCompletedTime(base.getCompletedTime());
        response.setGrade(base.getGrade());
        response.setIsPassed(base.getIsPassed());
        response.setQuizId(base.getQuizId());
        response.setStudentId(base.getStudentId());
        response.setChapterItemId(base.getChapterItemId());
        response.setTotalQuestions(base.getTotalQuestions());
        response.setCorrectAnswers(base.getCorrectAnswers());
        response.setIncorrectAnswers(base.getIncorrectAnswers());
        response.setUnansweredQuestions(base.getUnansweredQuestions());

        response.setAnswers(
                attempt.getAttemptAnswers()
                        .stream()
                        .map(this::convertQuizAttemptAnswerToDTO)
                        .toList()
        );
        return response;
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
                .chapterItemId(attempt.getChapterItem().getId())
                .totalQuestions(attempt.getTotalQuestions())
                .correctAnswers(attempt.getCorrectAnswers())
                .incorrectAnswers(attempt.getIncorrectAnswers())
                .unansweredQuestions(attempt.getUnansweredQuestions())
                .build();
    }

}
