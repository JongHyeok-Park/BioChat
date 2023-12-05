package com.example.jwt.controller;

import com.example.jwt.auth.PrincipalDetails;
import com.example.jwt.dto.ChatLogDto;
import com.example.jwt.dto.ChatRespDto;
import com.example.jwt.model.Chat;
import com.example.jwt.model.ChatLog;
import com.example.jwt.service.ChatLogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatController {

    private final ChatLogService chatLogService;

    @PostMapping("/chat")
    public ChatRespDto home(@RequestBody Chat chat , @AuthenticationPrincipal PrincipalDetails principalDetails) throws JsonProcessingException {
        String username = principalDetails.getUsername().substring(1, principalDetails.getUsername().length()-1);
        ChatLog chatLog = chatLogService.chat(chat, username);
        ChatRespDto chatRespDto = new ChatRespDto();
        chatRespDto.setAnswer(chatLog.getAnswer());
        return chatRespDto;
    }

    @GetMapping("/log")
    public LogResponseDto log(@AuthenticationPrincipal PrincipalDetails principalDetails){
        String username = principalDetails.getUsername().substring(1, principalDetails.getUsername().length()-1);
        System.out.println("principaldetails usename: "+ username);
        return new LogResponseDto(chatLogService.log(username));
    }

    @RequiredArgsConstructor
    @Getter
    static private class LogResponseDto{
        private final List<ChatLogDto> data;
    }
}
