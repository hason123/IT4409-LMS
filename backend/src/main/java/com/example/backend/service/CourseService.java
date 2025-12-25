package com.example.backend.service;

import com.example.backend.dto.request.course.CourseRequest;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.course.CourseResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {
    CourseResponse createCourse(CourseRequest courseRequest);

    CourseResponse updateCourse(Long id, CourseRequest courseRequest);

    void deleteCourseById(Long id);

    CourseResponse getCourseById(Long id);

    PageResponse<CourseResponse> getAllCourses(Pageable pageable);

    CloudinaryResponse uploadImage(final Long id, final MultipartFile file);

   // PageResponse<UserViewResponse> searchStudentsInCourse(Long courseId, SearchUserRequest request, Pageable pageable);

   // PageResponse<UserViewResponse> searchStudentsNotInCourse(Long courseId, SearchUserRequest request, Pageable pageable);
}
