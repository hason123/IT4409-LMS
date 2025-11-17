package com.example.backend.service;

import com.example.backend.entity.User;

public interface UserService {
    User handleGetUserByGmail(String email);

    User handleGetUserByUserName(String name);

    boolean isCurrentUser(Long userId);

    User getCurrentUser();

    User handleGetUserByUserNameAndRefreshToken(String userName, String refreshToken);

    void updateUserToken(String refreshToken, String userName);

    void deleteUserById(Long id);

    User createGoogleUser(String email, String name);

    // Object getUserById(Long id);

    //UserInfoResponse updateUser(Long id, UserRequest userRequest);
}
