package com.example.backend.repository;

import com.example.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    Integer countByRecipient_IdAndReadStatusFalse(Integer id);

    List<Notification> findByRecipient_IdOrderByCreatedAtDesc(Integer id);

}
