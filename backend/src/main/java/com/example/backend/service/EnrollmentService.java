package com.example.backend.service;

import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface EnrollmentService {
    @Transactional
    void addStudentsToCourse(Integer courseId, StudentCourseRequest request);

    @Transactional
    void removeStudentsInCourse(Integer courseId, StudentCourseRequest request);

    PageResponse<UserViewResponse> searchStudentsInCourse(Integer courseId, SearchUserRequest request, Pageable pageable);

    PageResponse<UserViewResponse> searchStudentsNotInCourse(Integer courseId, SearchUserRequest request, Pageable pageable);
}
