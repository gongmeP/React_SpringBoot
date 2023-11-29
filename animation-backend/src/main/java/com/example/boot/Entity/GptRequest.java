package com.example.boot.Entity;

import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GptRequest{
    private String prompt;
    private String model;
    private int temperature;
    private int max_tokens;
}
