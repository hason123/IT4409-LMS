package com.example.backend.controller;

import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.response.user.UserInfoResponse;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lms")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserInfoResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok((UserInfoResponse) userService.getUserById(id));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserInfoResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        UserInfoResponse updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/users")
    public ResponseEntity<UserInfoResponse> createUser(@RequestBody UserRequest request) {
        UserInfoResponse newUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/user/google")
    public ResponseEntity<UserInfoResponse> createGoogleUser(@RequestParam String email, @RequestParam String username) {
        UserInfoResponse newGoogleUser = userService.createGoogleUser(email, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGoogleUser);
    }
}

