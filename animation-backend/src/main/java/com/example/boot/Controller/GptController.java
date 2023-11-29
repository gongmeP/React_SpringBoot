package com.example.boot.Controller;

import com.example.boot.Entity.GptRequest;
import com.example.boot.Service.GptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class GptController {

    private final GptService gptService;

    @PostMapping("/AniRecommend")
    @CrossOrigin
    public ResponseEntity<?> getGptResponse(@RequestBody GptRequest gptRequest){

        System.out.println(gptRequest.getPrompt());

        return new ResponseEntity<>(gptService.getGptResponse(gptRequest.getPrompt()), HttpStatus.CREATED);
    }
}
