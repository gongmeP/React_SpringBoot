package com.example.boot.Config;

import lombok.Getter;
import lombok.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class GptConfig {
    @Value("${gpt.token}")
    private String token;

    @Value("${gpt.model}")
    private String model;

    @Value("${gpt.maxTokens}")
    private int maxTokens;

    @Value("${gpt.temperature}")
    private int temperature;
}
