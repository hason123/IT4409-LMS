package com.example.backend.controller;

import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserInfoResponse;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/lms")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @GetMapping("/users/{id}")
    public ResponseEntity<UserInfoResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok((UserInfoResponse) userService.getUserById(id));
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    @PutMapping("/users/{id}")
    public ResponseEntity<UserInfoResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        UserInfoResponse updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<UserInfoResponse> createUser(@RequestBody UserRequest request) {
        UserInfoResponse newUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/users/google")
    public ResponseEntity<UserInfoResponse> createGoogleUser(@RequestParam String email, @RequestParam String username) {
        User newGoogleUser = userService.createGoogleUser(email, username);
        UserInfoResponse newGoogleUserDTO = userService.convertUserInfoToDTO(newGoogleUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGoogleUserDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<PageResponse<UserInfoResponse>> getAllUsers(
            @RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "3", required = false) Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        PageResponse<UserInfoResponse> userPage = userService.getUserPage(pageable);
        return ResponseEntity.ok(userPage); // HTTP 200 + JSON list
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/users/{id}/avatar")
    public ResponseEntity<CloudinaryResponse> uploadImage(@PathVariable final Long id, @RequestPart final MultipartFile file) {
        CloudinaryResponse response = userService.uploadImage(id, file);
        return ResponseEntity.ok(response);
    }
}

