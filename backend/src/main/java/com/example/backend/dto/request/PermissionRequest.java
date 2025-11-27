package com.example.backend.dto.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionRequest {
    private String name;
    private String method;
    private String description;
}
