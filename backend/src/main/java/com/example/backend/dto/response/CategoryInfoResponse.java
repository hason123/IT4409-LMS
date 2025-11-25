package com.example.backend.dto.response.category;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryInfoResponse {
    private Long id;
    private String title;
    private String description;
}
