package com.example.backend.service.impl;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.response.LoginResponse;
import com.example.backend.dto.response.user.UserInfoResponse;
import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import com.example.backend.utils.SecurityUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;


    public AuthServiceImpl(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil, UserService userService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        User currentUser = userService.handleGetUserByUserName(request.getUsername());
        LoginResponse.UserLogin userLogin = new LoginResponse.UserLogin();
        userLogin.setId(currentUser.getId());
        userLogin.setUsername(currentUser.getUserName());
        userLogin.setRole(String.valueOf(currentUser.getRole().getRoleName()));
        LoginResponse response = new LoginResponse();
        response.setUser(userLogin);
        // Generate tokens
        String accessToken = securityUtil.createAccessToken(authentication.getName(), response);
        String refreshToken = securityUtil.createRefreshToken(request.getUsername(), response);
        // Update refresh token in DB
        userService.updateUserToken(refreshToken, request.getUsername());
        // Set tokens in DTO
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        return response;
    }

    @Override
    public LoginResponse refreshToken(String oldRefreshToken){
        Jwt decodeToken = securityUtil.checkValidRefreshToken(oldRefreshToken);
        String userName = decodeToken.getSubject();
        User user = userService.handleGetUserByUserNameAndRefreshToken(userName, oldRefreshToken);
        LoginResponse.UserLogin userLogin = new LoginResponse.UserLogin(
                user.getId(),
                user.getUserName(),
                user.getRole().getRoleName().name()
        );
        LoginResponse LoginResponse = new LoginResponse();
        LoginResponse.setUser(userLogin);
        String accessToken = securityUtil.createAccessToken(userName, LoginResponse);
        LoginResponse.setAccessToken(accessToken);
        String newRefreshToken = securityUtil.createRefreshToken(userName, LoginResponse);
        LoginResponse.setRefreshToken(newRefreshToken); // This field is @JsonIgnore
        userService.updateUserToken(newRefreshToken, userName);
        return LoginResponse;
    }

    @Override
    public void logout() {
        String userName = userService.getCurrentUser().getUserName();
        userService.updateUserToken("", userName);
    }

    @Override
    public LoginResponse register(UserRequest request) {
        UserInfoResponse registerUser = userService.createUser(request);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(registerUser.getUserName(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        User newUser = userService.handleGetUserByUserName(registerUser.getUserName());
        LoginResponse.UserLogin userLogin = new LoginResponse.UserLogin();
        userLogin.setId(newUser.getId());
        userLogin.setUsername(newUser.getUserName());
        userLogin.setRole(String.valueOf(newUser.getRole().getRoleName()));
        LoginResponse response = new LoginResponse();
        response.setUser(userLogin);
        // Generate tokens
        String accessToken = securityUtil.createAccessToken(authentication.getName(), response);
        String refreshToken = securityUtil.createRefreshToken(request.getUserName(), response);
        // Update refresh token in DB
        userService.updateUserToken(refreshToken, request.getUserName());
        // Set tokens in DTO
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        return response;

    }


}
