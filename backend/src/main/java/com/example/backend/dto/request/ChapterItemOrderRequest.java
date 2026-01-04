package com.example.backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ChapterItemOrderRequest {
    private List<Integer> orderedItemIds;
}
