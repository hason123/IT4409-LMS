package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "course")
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id = ?")
@SQLRestriction(value = "is_deleted = false")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @OneToMany(mappedBy = "course")
    private List<Chapter> chapters;
    @ManyToMany(mappedBy = "courses")
    private List<User> students;
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;


}
