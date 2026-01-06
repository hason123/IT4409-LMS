package com.example.backend.repository;

import com.example.backend.entity.Chapter;
import com.example.backend.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt,Long> {
}
