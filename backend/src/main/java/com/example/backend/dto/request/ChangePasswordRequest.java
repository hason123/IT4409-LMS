package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private Long userId;
    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;
}
