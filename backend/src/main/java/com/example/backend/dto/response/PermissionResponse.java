package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionResponse {
    private Long id;
    private String name;
    private String apiPath;
    private String method;
    private String description;
}
