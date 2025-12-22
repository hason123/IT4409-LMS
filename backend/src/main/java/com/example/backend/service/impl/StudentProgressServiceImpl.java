package com.example.backend.service.impl;

import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.StudentProgressResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.entity.Course;
import com.example.backend.entity.StudentProgress;
import com.example.backend.entity.User;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.StudentProgressRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.StudentProgressService;
import com.example.backend.service.UserService;
import com.example.backend.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class StudentProgressServiceImpl implements StudentProgressService {
    private final CourseRepository courseRepository;
    private final StudentProgressRepository studentProgressRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public StudentProgressServiceImpl(CourseRepository courseRepository, StudentProgressRepository studentProgressRepository, UserRepository userRepository, UserService userService) {
        this.courseRepository = courseRepository;
        this.studentProgressRepository = studentProgressRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Transactional
    @Override
    public void addStudentsToCourse(Long courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<User> users = userRepository.findAllById(request.getStudentIds());
        List<StudentProgress> progresses = users.stream()
                .map(user -> StudentProgress.builder()
                        .student(user)
                        .course(course)
                        .lessonProgress("0%")
                        .quizProgress("0%")
                        .build())
                .toList();
        studentProgressRepository.saveAll(progresses);
    }

    @Transactional
    @Override
    public void removeStudentsInCourse(Long courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (request.getStudentIds() == null || request.getStudentIds().isEmpty()) {
            return;
        }
        List<StudentProgress> progresses = studentProgressRepository.findByCourse_IdAndStudent_IdIn(courseId, request.getStudentIds());
        studentProgressRepository.deleteAll(progresses);
    }

    public PageResponse<StudentProgressResponse> getStudentProgressPage(Pageable pageable){
        Page<StudentProgress> studentProgressPage = studentProgressRepository.findAll(pageable);
        Page<StudentProgressResponse> studentProgressResponse = studentProgressPage.map(this::convertStudentProgressToDTO);
        PageResponse<StudentProgressResponse> response = new PageResponse<>(
                studentProgressResponse.getNumber() + 1,
                studentProgressResponse.getTotalPages(),
                studentProgressResponse.getNumberOfElements(),
                studentProgressResponse.getContent()
        );
        return response;

    }

    @Override
    public PageResponse<UserViewResponse> searchStudentsInCourse(Long courseId, SearchUserRequest request, Pageable pageable) {
        Specification<User> spec = buildBaseUserSearchSpec(request);
        spec = spec.and(UserSpecification.hasRole(RoleType.STUDENT));
        spec = spec.and(UserSpecification.inCourse(courseId));
        Page<User> userPage = userRepository.findAll(spec, pageable);
        Page<UserViewResponse> response = userPage.map(userService::convertUserViewToDTO);
        return new PageResponse<>(
                response.getNumber() + 1,
                response.getNumberOfElements(),
                response.getTotalPages(),
                response.getContent()
        );
    }

    @Override
    public PageResponse<UserViewResponse> searchStudentsNotInCourse(Long courseId, SearchUserRequest request, Pageable pageable) {
        Specification<User> spec = buildBaseUserSearchSpec(request);
        spec = spec.and(UserSpecification.hasRole(RoleType.STUDENT));
        spec = spec.and(UserSpecification.notInCourse(courseId));
        Page<User> userPage = userRepository.findAll(spec, pageable);
        Page<UserViewResponse> response = userPage.map(userService::convertUserViewToDTO);
        return new PageResponse<>(
                response.getNumber() + 1,
                response.getNumberOfElements(),
                response.getTotalPages(),
                response.getContent()
        );
    }

    private Specification<User> buildBaseUserSearchSpec(SearchUserRequest request) {
        Specification<User> spec = (root, query, cb) -> cb.conjunction();

        if (StringUtils.hasText(request.getUserName())) {
            spec = spec.and(UserSpecification.likeUserName(request.getUserName()));
        }
        if (StringUtils.hasText(request.getFullName())) {
            spec = spec.and(UserSpecification.likeFullName(request.getFullName()));
        }
        if (StringUtils.hasText(request.getStudentNumber())) {
            spec = spec.and(UserSpecification.hasStudentNumber(request.getStudentNumber()));
        }
        if (StringUtils.hasText(request.getGmail())) {
            spec = spec.and(UserSpecification.likeGmail(request.getGmail()));
        }
        return spec;
    }

    private StudentProgressResponse convertStudentProgressToDTO(StudentProgress studentProgress) {
        StudentProgressResponse response = new StudentProgressResponse();
        response.setLessonProgress(studentProgress.getLessonProgress());
        response.setQuizProgress(studentProgress.getQuizProgress());
        response.setStudentNumber(studentProgress.getStudent().getFullName());
        response.setCourseTitle(studentProgress.getCourse().getTitle());
        response.setFullName(studentProgress.getStudent().getFullName());
        response.setId(studentProgress.getId());
        return response;
    }
}
