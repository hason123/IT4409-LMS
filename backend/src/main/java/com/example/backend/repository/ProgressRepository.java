package com.example.backend.repository;

import com.example.backend.entity.StudentChapterItemProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<StudentChapterItemProgress, Integer> {
    @Query("SELECT COUNT(p) FROM StudentChapterItemProgress p " +
            "WHERE p.student.id = :studentId " +
            "AND p.chapterItem.chapter.course.id = :courseId " +
            "AND p.isCompleted = true")
    long countCompletedItemsByStudentAndCourse(@Param("studentId") Integer studentId,
                                               @Param("courseId") Integer courseId);

    Optional<StudentChapterItemProgress> findByStudent_IdAndChapterItem_Id(Integer studentId, Integer chapterItemId);
}
