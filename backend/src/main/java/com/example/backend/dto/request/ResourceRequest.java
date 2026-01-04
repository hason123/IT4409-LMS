package com.example.backend.dto.request;
import com.example.backend.constant.ResourceType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequest {
    private String title;
    private String description;
    private String url;
    private Integer lessonId;
    private ResourceType type;

}
