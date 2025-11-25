package com.example.backend.dto.response.meeting;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingInfoResponse {
    private Long id;
    private String roomCode;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String courseTitle;
}
