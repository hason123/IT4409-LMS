package com.example.backend.service.impl;

import com.example.backend.constant.ItemType;
import com.example.backend.dto.response.ChapterItemResponse;
import com.example.backend.dto.response.LessonResponse;
import com.example.backend.entity.Chapter;
import com.example.backend.entity.ChapterItem;
import com.example.backend.entity.Lesson;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.ChapterItemRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.ChapterItemService;
import com.example.backend.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChapterItemServiceImpl implements ChapterItemService {

    private final ChapterItemRepository chapterItemRepository;
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;
    private final QuizRepository quizRepository;
    private final ChapterRepository chapterRepository;

    @Transactional
    @Override
    public void updateOrder(Integer chapterId, List<Integer> orderedItemIds) {
        // 1. Lấy tất cả item hiện có trong DB thuộc chapter này
        List<ChapterItem> items = chapterItemRepository.findByChapter_Id(chapterId);

        // 2. Tạo Map để truy xuất nhanh item theo ID
        // Key: ID, Value: ChapterItem Entity
        Map<Integer, ChapterItem> itemMap = items.stream()
                .collect(Collectors.toMap(ChapterItem::getId, Function.identity()));

        // 3. Duyệt qua danh sách ID mới từ Frontend gửi về
        for (int i = 0; i < orderedItemIds.size(); i++) {
            Integer itemId = orderedItemIds.get(i);
            ChapterItem item = itemMap.get(itemId);

            if (item != null) {
                // Cập nhật orderIndex = vị trí trong mảng + 1
                item.setOrderIndex(i + 1);
            }
        }
        chapterItemRepository.saveAll(items);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ChapterItemResponse> getItemsByChapter(Integer chapterId) {
        // Lấy danh sách Item đã sort
        List<ChapterItem> items = chapterItemRepository.findByChapter_IdOrderByOrderIndexAsc(chapterId);
        if (items.isEmpty()) return new ArrayList<>();

        // Tách ID để query batch (tránh lỗi N+1)
        List<Integer> lessonIds = items.stream()
                .filter(i -> i.getType() == ItemType.LESSON)
                .map(ChapterItem::getRefId).toList();

        List<Integer> quizIds = items.stream()
                .filter(i -> i.getType() == ItemType.QUIZ)
                .map(ChapterItem::getRefId).toList();

        // Lấy data Lesson và Quiz từ DB
        Map<Integer, Lesson> lessonMap = lessonRepository.findAllById(lessonIds).stream()
                .collect(Collectors.toMap(Lesson::getId, Function.identity()));

        Map<Integer, Quiz> quizMap = quizRepository.findAllById(quizIds).stream()
                .collect(Collectors.toMap(Quiz::getId, Function.identity()));

        // Map sang DTO Response
        return items.stream().map(ci -> {
            Object detail = null;

            if (ci.getType() == ItemType.LESSON) {
                Lesson lesson = lessonMap.get(ci.getRefId());
                if (lesson != null) {
                    detail = lessonService.convertEntityToDTO(lesson); // Hàm convert ở dưới cùng
                }
            }
                /*else if (ci.getType() == ItemType.QUIZ) {
                    Quiz quiz = quizMap.get(ci.getRefId());
                    if (quiz != null) {
                        detail = quiz; // Hoặc convertQuizToDTO(quiz) nếu cần
                    }
                }*/

            return buildResponse(ci, detail);
        }).toList();
    }

    @Transactional
    @Override
    public ChapterItemResponse addLessonToChapter(Integer chapterId, Lesson lesson) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found"));
        Lesson savedLesson = lesson;
        if (lesson.getId() == null) {
            savedLesson = lessonRepository.save(lesson);
        }
        ChapterItem ci = createChapterItem(chapter, ItemType.LESSON, savedLesson.getId());
        LessonResponse lessonResponse = lessonService.convertEntityToDTO(savedLesson);
        return buildResponse(ci, lessonResponse);
    }

/*    @Transactional
    @Override
    public ChapterItemResponse addQuizToChapter(Integer chapterId, Quiz quiz) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        if (quiz.getId() == null) quiz = quizRepository.save(quiz);

        ChapterItem ci = createChapterItem(chapter, ItemType.QUIZ, quiz.getId());

        return buildResponse(ci, quiz);
    }*/

    private ChapterItem createChapterItem(Chapter chapter, ItemType type, Integer refId) {
        ChapterItem ci = new ChapterItem();
        ci.setChapter(chapter);
        ci.setType(type);
        ci.setRefId(refId);
        Integer maxOrder = chapterItemRepository.findMaxOrderIndexByChapter(chapter.getId());
        ci.setOrderIndex(maxOrder == null ? 1 : maxOrder + 1);
        return chapterItemRepository.save(ci);
    }

    private ChapterItemResponse buildResponse(ChapterItem ci, Object itemDetail) {
        ChapterItemResponse response = new ChapterItemResponse();
        response.setId(ci.getId());
        response.setType(ci.getType());
        response.setOrderIndex(ci.getOrderIndex());
        response.setItem(itemDetail);
        if (ci.getChapter() != null) {
            response.setChapterId(ci.getChapter().getId());
        }
        return response;
    }
}
