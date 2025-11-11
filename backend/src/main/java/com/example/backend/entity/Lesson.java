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
@Table(name= "lesson")
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id = ?")
@SQLRestriction(value = "is_deleted = false")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "content", columnDefinition = "MEDIUMTEXT")
    private String content;
    @Column(name = "orderIndex")
    private Integer orderIndex;
    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;


}
