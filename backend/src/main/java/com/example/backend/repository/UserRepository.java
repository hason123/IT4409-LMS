package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByGmail(String gmail);

    User findByUserName(String userName);

    User findByUserNameAndRefreshToken(String userName, String refreshToken);


}
