package com.example.jwt.repository;

import com.example.jwt.model.ChatLog;
import com.example.jwt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
    List<ChatLog> findByUser_id(Long id);
}
