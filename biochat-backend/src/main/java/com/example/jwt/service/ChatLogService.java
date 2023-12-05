package com.example.jwt.service;

import com.example.jwt.dto.ChatLogDto;
import com.example.jwt.model.Chat;
import com.example.jwt.model.ChatLog;
import com.example.jwt.model.User;
import com.example.jwt.repository.ChatLogRepository;
import com.example.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatLogService {

    private final UserRepository userRepository;
    private final ChatLogRepository chatLogRepository;

    public ChatLog chat(Chat chat, String username){

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String params = "{\"question\": \""+chat.getQuestion()+"\"}";
        HttpEntity<String> request = new HttpEntity<>(params, headers);
        System.out.println(request.toString());
        ResponseEntity<String> response = restTemplate.exchange("https://api.biochat.net/chat", HttpMethod.POST, request, String.class);
        String question = chat.getQuestion();
        String answer = response.getBody();
        System.out.println("answer: " + answer);
        ChatLog chatLog = new ChatLog();
        chatLog.setUser(userRepository.findByUsername(username));
        chatLog.setQuestion(question);
        chatLog.setAnswer(answer);
        ChatLog save = chatLogRepository.save(chatLog);
        return save;
    }

    public List<ChatLogDto> log(String username){
        User user = userRepository.findByUsername(username);
        List<ChatLog> logs = chatLogRepository.findByUser_id(user.getId());
        List<ChatLogDto> response = logs.stream().map((log) -> new ChatLogDto(log)).collect(Collectors.toList());
        return response;
    }
}
