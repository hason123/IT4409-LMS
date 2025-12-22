package com.example.backend.controller;

import com.example.backend.dto.request.StudentProgressRequest;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.StudentProgressResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.service.StudentProgressService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms")
public class StudentProgressController {
    private final StudentProgressService studentProgressService;

    public StudentProgressController(StudentProgressService studentProgressService) {
        this.studentProgressService = studentProgressService;
    }

    // Tìm và lấy danh sách sinh viên có trong khóa học
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @GetMapping("/courses/{courseId}/students/available")
    public ResponseEntity<PageResponse<UserViewResponse>> getStudentsInCourse(
            @PathVariable Long courseId, SearchUserRequest request,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<UserViewResponse> response = studentProgressService.searchStudentsInCourse(courseId, request, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Tìm và láy danh sách sinh viên không có trong khóa học
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @GetMapping("/courses/{courseId}/students/not-available")
    public ResponseEntity<PageResponse<UserViewResponse>> getStudentsNotInCourse(
            @PathVariable Long courseId, SearchUserRequest request,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<UserViewResponse> response = studentProgressService.searchStudentsNotInCourse(courseId, request, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Thêm sinh viên vào khóa học
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/courses/{courseId}/students")
    public ResponseEntity<String> addStudentsToCourse(@PathVariable Long courseId, @RequestBody StudentCourseRequest request) {
        studentProgressService.addStudentsToCourse(courseId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Students has been added");
    }

    // Xóa sinh viên khỏi khóa học
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/courses/{courseId}/students")
    public ResponseEntity<String> removeStudentsInCourse(@PathVariable Long courseId, @RequestBody StudentCourseRequest request) {
        studentProgressService.removeStudentsInCourse(courseId, request);
        return ResponseEntity.status(HttpStatus.OK).body("Students has been deleted");
    }
}
