package com.example.jwt.dto;

import com.example.jwt.model.ChatLog;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ChatLogDto {
    private String question;
    private String answer;
    private String createdAt;

    public ChatLogDto(ChatLog chatLog){
        this.question = chatLog.getQuestion();
        this.answer = chatLog.getAnswer();
        this.createdAt = chatLog.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
