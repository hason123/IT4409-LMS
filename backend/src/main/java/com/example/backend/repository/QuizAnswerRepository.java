package com.example.backend.repository;

import com.example.backend.entity.QuizAnswer;
import com.example.backend.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizAnswerRepository extends JpaRepository<QuizAnswer,Long> {
    boolean existsByQuizQuestion_Id(Long id);
}
