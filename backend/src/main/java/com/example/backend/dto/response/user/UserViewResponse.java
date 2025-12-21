package com.example.backend.dto.response.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserViewResponse {
    private String userName;
    private String fullName;
    private String studentNumber;
    private String gmail;

}
