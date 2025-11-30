package com.example.backend.controller;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.response.LoginResponse;
import com.example.backend.dto.response.user.UserInfoResponse;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lms")
public class AuthController {

    private final AuthService authService;

    @Value("${hayson.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        ResponseCookie springCookie = ResponseCookie.from("refresh_token", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        response.setRefreshToken(null);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                .body(response);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<LoginResponse> register(@RequestBody UserRequest request) {
        LoginResponse response = authService.register(request);
        ResponseCookie springCookie = ResponseCookie.from("refresh_token", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        response.setRefreshToken(null);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                .body(response);
    }


    @PutMapping("/auth/refresh")
    public ResponseEntity<LoginResponse> refreshToken(
            @CookieValue(name = "refresh_token", defaultValue = "none") String refreshToken){
        LoginResponse response = authService.refreshToken(refreshToken);
        ResponseCookie cookie = ResponseCookie
                .from("refresh_token", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .maxAge(refreshTokenExpiration)
                .path("/")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PutMapping("/auth/logout")
    public ResponseEntity<?> logout(){
        authService.logout();
        return ResponseEntity.ok().build();
    }


}

