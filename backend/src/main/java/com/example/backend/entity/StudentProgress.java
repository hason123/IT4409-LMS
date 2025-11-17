package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name= "student_progress")
@SQLDelete(sql = "UPDATE student_progress SET is_deleted = true WHERE id = ?")
@SQLRestriction(value = "is_deleted = false")
public class StudentProgress extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @Column(name = "lesson_progress")
    private Integer lessonProgress;
    @Column(name = "quiz_progress")
    private Integer quizProgress;



}
