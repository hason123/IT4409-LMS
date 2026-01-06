package com.example.backend.repository;

import com.example.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    List<Enrollment> findByCourse_IdAndStudent_IdIn(
            Long courseId,
            List<Long> studentIds
    );

    Enrollment findByStudent_IdAndCourse_Id(Long studentId, Long courseId);
}
