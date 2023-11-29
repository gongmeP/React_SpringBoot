package com.example.boot.Service;

import com.example.boot.Config.GptConfig;
import com.example.boot.Entity.GptRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GptServiceImpl implements GptService {

    private static final String GPT_URL = "https://api.openai.com/v1/completions";
    private final GptConfig gptConfig;
    private final ObjectMapper objectMapper = new ObjectMapper();
    public GptServiceImpl(GptConfig gptConfig) {
        this.gptConfig = gptConfig;
    }

    @Override
    public ResponseEntity<Map> getGptResponse(String prompt) {
        if(!ObjectUtils.isEmpty(prompt)) {
            HttpHeaders httpHeaders = getHttpHeaders();
            GptRequest gptRequest = getGptRequest(prompt);
            Map<String,Object> requestBody= getRequestBody(gptRequest);


            HttpEntity<Map<String,Object>> requestEntity = new HttpEntity<>(requestBody,httpHeaders);
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(GPT_URL,requestEntity,Map.class);
            return responseEntity;
        }

        return null;
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set("Authorization","Bearer "+gptConfig.getToken());
        return httpHeaders;
    }

    private GptRequest getGptRequest(String prompt) {
        GptRequest gptRequest = new GptRequest();
        gptRequest.setPrompt("추천해주세요 "+prompt+" 장르의 애니메이션 3개. 간략한 내용과 함께");
        gptRequest.setTemperature(gptConfig.getTemperature());
        gptRequest.setMax_tokens(gptConfig.getMaxTokens());
        gptRequest.setModel(gptConfig.getModel());
        return gptRequest;
    }

    private Map<String,Object> getRequestBody(GptRequest gptRequest) {
        return objectMapper.convertValue(gptRequest, Map.class);
    }
}
