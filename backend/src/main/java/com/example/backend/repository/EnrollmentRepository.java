package com.example.backend.repository;

import com.example.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer> {
    List<Enrollment> findByCourse_IdAndStudent_IdIn(
            Integer courseId,
            List<Integer> studentIds
    );

    Enrollment findByStudent_IdAndCourse_Id(Integer studentId, Integer courseId);
}
