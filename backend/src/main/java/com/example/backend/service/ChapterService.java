package com.example.backend.service;

import com.example.backend.dto.request.ChapterRequest;
import com.example.backend.dto.response.ChapterResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.entity.Chapter;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ChapterService {
    ChapterResponse createChapter(ChapterRequest request);
    ChapterResponse getChapterById(Integer id);
    ChapterResponse updateChapter(Integer id, ChapterRequest request);
    void deleteChapter(Integer id);
    
    PageResponse<ChapterResponse> getChapterPage(Pageable pageable);
    List<ChapterResponse> getChaptersByCourseId(Long courseId);
    ChapterResponse convertChapterToDTO(Chapter chapter);
}

