package com.example.backend.service.impl;

import com.example.backend.dto.response.NotificationResponse;
import com.example.backend.entity.Notification;
import com.example.backend.entity.User;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.service.NotificationService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public void createNotification(User recipient, String message) {
        Notification notification = Notification.builder()
                .recipient(recipient)
                .message(message)
                .readStatus(false)
                .createdAt(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public int countUnread() {
        User currentUser = userService.getCurrentUser();
        return notificationRepository.countByRecipient_IdAndReadStatusFalse(currentUser.getId());
    }

    @Override
    public List<NotificationResponse> getMyNotifications() {
        User currentUser = userService.getCurrentUser();
        return notificationRepository.findByRecipient_IdOrderByCreatedAtDesc(currentUser.getId())
                .stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setReadStatus(true);
            notificationRepository.save(notification);
        }
    }

    private NotificationResponse convertEntityToDTO(Notification notification) {
        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setMessage(notification.getMessage());
        response.setReadStatus(notification.isReadStatus());
        response.setCreatedAt(notification.getCreatedAt());
        return response;
    }

}
