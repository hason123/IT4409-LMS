package com.example.backend.controller;

import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @Operation(summary = "Lấy danh sách sinh viên trong khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @GetMapping("/courses/{courseId}/students/available")
    public ResponseEntity<PageResponse<UserViewResponse>> getStudentsInCourse(
            @PathVariable Long courseId, SearchUserRequest request,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<UserViewResponse> response = enrollmentService.searchStudentsInCourse(courseId, request, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Operation(summary = "Lấy danh sách sinh viên không trong khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @GetMapping("/courses/{courseId}/students/not-available")
    public ResponseEntity<PageResponse<UserViewResponse>> getStudentsNotInCourse(
            @PathVariable Long courseId, SearchUserRequest request,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<UserViewResponse> response = enrollmentService.searchStudentsNotInCourse(courseId, request, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Operation(summary = "Thêm sinh viên vào khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/courses/{courseId}/students")
    public ResponseEntity<String> addStudentsToCourse(@PathVariable Long courseId, @RequestBody StudentCourseRequest request) {
        enrollmentService.addStudentsToCourse(courseId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Students has been added");
    }

    @Operation(summary = "Xóa sinh viên khỏi khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/courses/{courseId}/students")
    public ResponseEntity<String> removeStudentsInCourse(@PathVariable Long courseId, @RequestBody StudentCourseRequest request) {
        enrollmentService.removeStudentsInCourse(courseId, request);
        return ResponseEntity.status(HttpStatus.OK).body("Students has been deleted");
    }
}