package com.example.boot.controller;

//단위 테스트 (Controller, Filter, ControllerAdvice)


import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;


@Slf4j
@WebMvcTest
public class BookControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void save_Test(){

       log.info("save_Text() 시작 ======================= ");

    }
}
