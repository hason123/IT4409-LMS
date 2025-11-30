package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String title;
    private String description;
}
