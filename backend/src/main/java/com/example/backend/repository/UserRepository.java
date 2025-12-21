package com.example.backend.repository;

import com.example.backend.constant.RoleType;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {
    User findByGmail(String gmail);

    User findByUserName(String userName);

    User findByUserNameAndRefreshToken(String userName, String refreshToken);

    @Query("""
        SELECT u
        FROM User u
        WHERE u.role.roleName = :roleName
        AND NOT EXISTS (
            SELECT sp.id
            FROM StudentProgress sp
            WHERE sp.student = u
            AND sp.course.id = :courseId
        )
    """)
    List<User> findUsersNotInCourseByRole(
            @Param("courseId") Long courseId,
            @Param("roleName") RoleType roleType
    );

}
