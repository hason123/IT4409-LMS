package com.example.backend.service;

import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface EnrollmentService {
    @Transactional
    void addStudentsToCourse(Long courseId, StudentCourseRequest request);

    @Transactional
    void removeStudentsInCourse(Long courseId, StudentCourseRequest request);

    PageResponse<UserViewResponse> searchStudentsInCourse(Long courseId, SearchUserRequest request, Pageable pageable);

    PageResponse<UserViewResponse> searchStudentsNotInCourse(Long courseId, SearchUserRequest request, Pageable pageable);
}
