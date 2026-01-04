package com.example.backend.controller;

import com.example.backend.dto.request.ResourceRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.ResourceResponse;
import com.example.backend.service.ResourceService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lms")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/lessons/{lessonId}/resources")
    public ResponseEntity<ResourceResponse> createResource(
            @PathVariable Integer lessonId,
            @RequestBody ResourceRequest request
    ) {
        ResourceResponse response = resourceService.createResource(lessonId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/resources/{id}")
    public ResponseEntity<ResourceResponse> updateResource(
            @PathVariable Integer id,
            @RequestBody ResourceRequest request
    ) {
        ResourceResponse response = resourceService.updateResource(id, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/resources/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Integer id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/resources/{id}")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable Integer id) {
        ResourceResponse response = resourceService.getResourceById(id);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/resources")
    public ResponseEntity<PageResponse<ResourceResponse>> getAllResources(
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<ResourceResponse> response =
                resourceService.getResourcePage(pageable);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/lessons/{lessonId}/resources")
    public ResponseEntity<List<ResourceResponse>> getResourcesByLesson(
            @PathVariable Integer lessonId
    ) {
        List<ResourceResponse> responses =
                resourceService.getResourcesByLessonId(lessonId);
        return ResponseEntity.ok(responses);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/resources/{id}/video")
    public ResponseEntity<CloudinaryResponse> uploadVideo(
            @PathVariable Integer id,
            @RequestPart MultipartFile file
    ) {
        CloudinaryResponse response =
                resourceService.uploadVideoResource(id, file);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/resources/{id}/slide")
    public ResponseEntity<CloudinaryResponse> uploadSlide(
            @PathVariable Integer id,
            @RequestPart MultipartFile file
    ) {
        CloudinaryResponse response =
                resourceService.uploadSlideResource(id, file);
        return ResponseEntity.ok(response);
    }
}
