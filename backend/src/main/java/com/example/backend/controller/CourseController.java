package com.example.backend.controller;

import com.example.backend.dto.request.course.CourseRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.course.CourseResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/lms")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @Operation(summary = "Tạo khóa học mới")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/courses")
    public ResponseEntity<CourseResponse> createCourse(@RequestBody CourseRequest request) {
        CourseResponse response = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Cập nhật thông tin khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseResponse> updateCourse(@PathVariable Integer id, @RequestBody CourseRequest request) {
        CourseResponse response = courseService.updateCourse(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Xóa khóa học")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourseById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Lấy thông tin khóa học theo ID")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/courses/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Integer id) {
        CourseResponse response = courseService.getCourseById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Lấy danh sách khóa học có phân trang")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/courses")
    public ResponseEntity<PageResponse<CourseResponse>> getAllCourses(
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<CourseResponse> response =
                courseService.getAllCourses(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Tải lên ảnh đại diện khóa học")
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @PostMapping("/courses/{id}/avatar")
    public ResponseEntity<CloudinaryResponse> uploadImage(@PathVariable final Integer id, @RequestPart final MultipartFile file) {
        CloudinaryResponse response = courseService.uploadImage(id, file);
        return ResponseEntity.ok(response);
    }
}