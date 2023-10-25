package com.example.boot.controller;


//통합 테스트 (모든 Bean들을 메모리에 올려 테스트)
//WebEnvironment.MOCK = 가상 톰켓으로 테스트
//WebEnvironment.RANDOM_PORT = 실제 톰켓으로 테스트
//@AutoConfigureMockMvc MockMvc를 메모리등록
//@Transactional 각각의 테스트 함수가 종료될때마다 트랜잭션을 롤백 해줌 독립시행


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

@AutoConfigureMockMvc
@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class BookControllerIntegreTest {

    @Autowired
    private MockMvc mockMvc;
}
