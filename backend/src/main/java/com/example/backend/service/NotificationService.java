package com.example.backend.service;

import com.example.backend.dto.response.NotificationResponse;
import com.example.backend.entity.User;

import java.util.List;

public interface NotificationService {
    void createNotification(User recipient, String message);

    int countUnread();

    List<NotificationResponse> getMyNotifications();

    void markAsRead(Integer notificationId);
}
