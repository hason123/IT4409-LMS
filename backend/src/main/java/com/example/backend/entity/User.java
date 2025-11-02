package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "user")
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id = ?")
@SQLRestriction(value = "is_deleted = false") //mac dinh chi lay nhung ban gi ko bi soft delete
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "user_name", unique = true)
    private String userName;
    @Column(name = "pass_word")
    private String password;
    @Column(name = "full_name", unique = true)
    private String fullName;
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
    @Column(name = "birthday")
    private String bỉrthday;
    @Column(name = "student_number", unique = true)
    private String studentNumber;
    @Column(name = "address")
    private String address;
    @Column(name = "refresh_token", columnDefinition = "MEDIUMTEXT")
    private String refreshToken;
    @Column(name = "gmail")
    private String gmail;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @OneToMany(mappedBy = "teacher")
    private List<Course> taughtCourses;


}
