package com.example.backend.repository;

import com.example.backend.entity.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress,Long> {
}
