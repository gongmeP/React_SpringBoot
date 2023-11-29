package com.example.boot.Service;

import org.springframework.http.ResponseEntity;

import java.util.Map;
public interface GptService {
    ResponseEntity<Map> getGptResponse(String prompt);
}
