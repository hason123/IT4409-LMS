package com.example.backend.dto.response.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserViewResponse {
    private Long id;
    private String userName;
    private String fullName;
    private String studentNumber;
    private String gmail;
    private String imageUrl;
    private String cloudinaryImageId;

}
