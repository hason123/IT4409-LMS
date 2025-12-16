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
@Builder
@Entity
@Table(name= "user")
@SQLDelete(sql = "UPDATE user SET is_deleted = true WHERE user_id = ?")
@SQLRestriction(value = "is_deleted = false") //mac dinh chi lay nhung ban ghi ko bi soft delete
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "user_name", unique = true)
    private String userName;
    @Column(name = "pass_word")
    private String password;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "birthday")
    private String birthday;
    @Column(name = "student_number")
    private String studentNumber;
    @Column(name = "address")
    private String address;
    @Column(name = "refresh_token", columnDefinition = "MEDIUMTEXT")
    private String refreshToken;
    @Column(name = "gmail")
    private String gmail;
    @Column(name = "image_url", columnDefinition = "MEDIUMTEXT")
    private String imageUrl;
    @Column(name = "cloudinary_image_id")
    private String cloudinaryImageId;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    @OneToMany(mappedBy = "student")
    private List<StudentProgress> studentProgress;
    @OneToMany(mappedBy = "teacher")
    private List<Course> taughtCourses;


}
