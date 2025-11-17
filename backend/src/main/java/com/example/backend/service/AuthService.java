package com.example.backend.service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    LoginResponse refreshToken(String oldRefreshToken);

    void logout();
}
