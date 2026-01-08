package com.example.backend.repository;

import com.example.backend.constant.EnrollmentStatus;
import com.example.backend.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer> {
    List<Enrollment> findByCourse_IdAndStudent_IdIn(
            Integer courseId,
            List<Integer> studentIds
    );

    Page<Enrollment> findByCourse_IdAndApprovalStatus(Integer courseId, EnrollmentStatus enrollmentStatus, Pageable pageable);

    Enrollment findByStudent_IdAndCourse_Id(Integer studentId, Integer courseId);

    Enrollment findByStudent_IdAndCourse_IdAndApprovalStatus(Integer studentId, Integer courseId, EnrollmentStatus approvalStatus);

    boolean existsByStudent_IdAndCourse_IdAndApprovalStatus(Integer studentId, Integer courseId, EnrollmentStatus approvalStatus);

    Page<Enrollment> findByStudent_IdAndApprovalStatus(Integer studentId, EnrollmentStatus approvalStatus, Pageable pageable);

}
