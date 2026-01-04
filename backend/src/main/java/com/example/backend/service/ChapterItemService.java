package com.example.backend.service;

import com.example.backend.dto.response.ChapterItemResponse;
import com.example.backend.entity.Lesson;
import com.example.backend.entity.Quiz;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ChapterItemService {
    @Transactional(readOnly = true)
    List<ChapterItemResponse> getItemsByChapter(Integer chapterId);

    @Transactional
    ChapterItemResponse addLessonToChapter(Integer chapterId, Lesson lesson);

    @Transactional
    void updateOrder(Integer chapterId, List<Integer> orderedItemIds);

//    @Transactional
//   // ChapterItemResponse addQuizToChapter(Integer chapterId, Quiz quiz);
}
