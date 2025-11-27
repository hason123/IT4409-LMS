package com.example.backend.dto.response.chapter;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterInfoResponse {
    private Integer id;
    private String title;
    private String orderIndex;
    private String courseTitle;
}
