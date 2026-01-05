package com.example.backend.controller;

import com.example.backend.dto.request.ChapterItemOrderRequest;
import com.example.backend.dto.response.ChapterItemResponse;
import com.example.backend.entity.Lesson;
import com.example.backend.service.ChapterItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lms")
@RequiredArgsConstructor
public class ChapterItemController {

    private final ChapterItemService chapterItemService;

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/chapters/{chapterId}/items")
    public ResponseEntity<List<ChapterItemResponse>> getItemsByChapter(
            @PathVariable Integer chapterId
    ) {
        return ResponseEntity.ok(
                chapterItemService.getItemsByChapter(chapterId)
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/chapters/{chapterId}/order-items")
    public ResponseEntity<Void> updateItemOrder(
            @PathVariable Integer chapterId,
            @RequestBody ChapterItemOrderRequest request
    ) {
        chapterItemService.updateOrder(chapterId, request.getOrderedItemIds());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/chapters/{chapterId}/lessons/{lessonId}")
    public ResponseEntity<ChapterItemResponse> addLessonToChapter(
            @PathVariable Integer chapterId,
            @PathVariable Integer lessonId
    ) {
        return ResponseEntity.ok(
                chapterItemService.addLessonToChapter(chapterId, lessonId)
        );
    }

    /*
    // ================= ADD QUIZ TO CHAPTER (OPTIONAL) =================
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PostMapping("/chapters/{chapterId}/quizzes")
    public ResponseEntity<ChapterItemResponse> addQuizToChapter(
            @PathVariable Integer chapterId,
            @RequestBody Quiz quiz
    ) {
        return ResponseEntity.ok(
                chapterItemService.addQuizToChapter(chapterId, quiz)
        );
    }
    */
}
