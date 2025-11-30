package com.example.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterResponse {
    private Integer id;
    private String title;
    private String orderIndex;
    private String courseTitle;
}
