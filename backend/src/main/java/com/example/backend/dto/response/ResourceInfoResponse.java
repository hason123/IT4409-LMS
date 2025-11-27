package com.example.backend.dto.response.resource;

import com.example.backend.constant.ResourceType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceInfoResponse {
    private Integer id;
    private String title;
    private String url;
    private ResourceType type;
    private String orderIndex;
    private String lessonTitle;
}
