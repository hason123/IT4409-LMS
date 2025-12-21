package com.example.backend.repository;

import com.example.backend.entity.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress,Long> {
    List<StudentProgress> findByCourse_IdAndStudent_IdIn(
            Long courseId,
            List<Long> studentIds
    );
}
