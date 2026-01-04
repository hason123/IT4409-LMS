package com.example.backend.controller;

import com.example.backend.dto.request.*;
import com.example.backend.dto.response.LoginResponse;
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


/*    @PostMapping("/auth/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
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
    }*/
/*
    @PostMapping("/auth/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        authService.register(request); // chỉ tạo user + gửi OTP
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@RequestBody OtpVerificationRequest request) {
        LoginResponse response = authService.verifyOtp(request);
        ResponseCookie refreshCookie = ResponseCookie
                .from("refresh_token", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        response.setRefreshToken(null);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(response);
    }*/
    @PostMapping("/auth/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@RequestBody OtpVerificationRequest request) {
        LoginResponse response = authService.verifyOtp(request);

        ResponseCookie refreshCookie = ResponseCookie
                .from("refresh_token", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        response.setRefreshToken(null);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(response);
    }

    @PostMapping("/auth/resend-register-otp")
    public ResponseEntity<Void> resendRegisterOtp(@RequestParam String gmail) {
        authService.resendRegisterOtp(gmail);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest request) {
        authService.changePassWord(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/reset-password/confirm")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/resend-reset-password-otp")
    public ResponseEntity<Void> resendResetPasswordOtp(@RequestParam String gmail) {
        authService.resendResetPasswordOtp(gmail);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/reset-password/request")
    public ResponseEntity<Void> resetPasswordRequest(@RequestParam String gmail) {
        authService.resetPasswordVerification(gmail);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/google")
    public ResponseEntity<LoginResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        LoginResponse response = authService.googleLogin(request);
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

