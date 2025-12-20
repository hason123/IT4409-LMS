package com.example.backend.service;

import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserInfoResponse;
import com.example.backend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User handleGetUserByGmail(String email);

    User handleGetUserByUserName(String name);

    boolean isCurrentUser(Long userId);

    User getCurrentUser();

    User handleGetUserByUserNameAndRefreshToken(String userName, String refreshToken);

    void updateUserToken(String refreshToken, String userName);

    void deleteUserById(Long id);

    User createGoogleUser(String email, String name);

    UserInfoResponse updateUser(Long id, UserRequest request);

    Object getUserById(Long id);

    PageResponse<UserInfoResponse> getUserPage(Pageable pageable);

    UserInfoResponse createUser(UserRequest request);

    PageResponse<UserInfoResponse> searchUser(SearchUserRequest request, Pageable pageable);

    UserInfoResponse convertUserInfoToDTO(User user);

    CloudinaryResponse uploadImage(final Long id, final MultipartFile file);

    // Object getUserById(Long id);

    //UserInfoResponse updateUser(Long id, UserRequest userRequest);
}
