package com.example.backend.dto.response.permission;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionInfoResponse {
    private Long id;
    private String name;
    private String apiPath;
    private String method;
    private String description;
}
