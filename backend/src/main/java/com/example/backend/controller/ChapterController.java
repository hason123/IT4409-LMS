package com.example.backend.controller;
import com.example.backend.dto.request.ChapterRequest;
import com.example.backend.dto.response.ChapterResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.service.CategoryService;
import com.example.backend.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lms/chapters")
public class ChapterController {
    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping
    public ResponseEntity<ChapterResponse> createChapter(@RequestBody ChapterRequest request) {
        return ResponseEntity.ok(chapterService.createChapter(request));
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/{id}")
    public ResponseEntity<ChapterResponse> getChapterById(@PathVariable Integer id) {
        return ResponseEntity.ok(chapterService.getChapterById(id));
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping
    public ResponseEntity<PageResponse<ChapterResponse>> getAllChapters(
            @RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<ChapterResponse> chapterPage = chapterService.getChapterPage(pageable);
        return ResponseEntity.ok(chapterPage);
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<ChapterResponse>> getChaptersByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(chapterService.getChaptersByCourseId(courseId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/{id}")
    public ResponseEntity<ChapterResponse> updateChapter(
            @PathVariable Integer id,
            @RequestBody ChapterRequest request
    ) {
        return ResponseEntity.ok(chapterService.updateChapter(id, request));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChapter(@PathVariable Integer id) {
        chapterService.deleteChapter(id);
        return ResponseEntity.noContent().build();
    }
}
