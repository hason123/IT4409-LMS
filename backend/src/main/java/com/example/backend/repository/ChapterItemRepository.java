package com.example.backend.repository;

import com.example.backend.entity.ChapterItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterItemRepository extends JpaRepository<ChapterItem,Integer> {
    // Lấy danh sách item theo chapter để hiển thị
    List<ChapterItem> findByChapter_IdOrderByOrderIndexAsc(Integer chapterId);

    // Tìm orderIndex lớn nhất hiện tại (để thêm mới vào cuối)
    @Query("SELECT MAX(ci.orderIndex) FROM ChapterItem ci WHERE ci.chapter.id = :chapterId")
    Integer findMaxOrderIndexByChapter(@Param("chapterId") Integer chapterId);

    // Tìm tất cả item thuộc chapter (dùng cho việc update order)
    List<ChapterItem> findByChapter_Id(Integer chapterId);

    ChapterItem findByRefId(Integer refId);

    Integer refId(Integer refId);
}
