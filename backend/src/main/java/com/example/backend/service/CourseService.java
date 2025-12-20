package com.example.backend.service;

import com.example.backend.dto.request.CourseRequest;
import com.example.backend.dto.response.CourseResponse;
import com.example.backend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    CourseResponse createCourse(CourseRequest courseRequest);

    CourseResponse updateCourse(Long id, CourseRequest courseRequest);

    void deleteCourseById(Long id);

    CourseResponse getCourseById(Long id);

    PageResponse<CourseResponse> getAllCourses(Pageable pageable);


}
