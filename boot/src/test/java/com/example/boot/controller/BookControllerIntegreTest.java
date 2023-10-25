package com.example.boot.Controller;


//통합 테스트 (모든 Bean들을 메모리에 올려 테스트)
//WebEnvironment.MOCK = 가상 톰켓으로 테스트
//WebEnvironment.RANDOM_PORT = 실제 톰켓으로 테스트
//@AutoConfigureMockMvc MockMvc를 메모리등록
//@Transactional 각각의 테스트 함수가 종료될때마다 트랜잭션을 롤백 해줌 독립시행



import com.example.boot.Entity.Book;
import com.example.boot.Service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.transaction.Transactional;

import static org.mockito.Mockito.when;


@Slf4j
@AutoConfigureMockMvc
@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@EnableWebMvc
public class BookControllerIntegreTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;


        @Test
        public void save_Test() throws Exception {
            // Given (테스트 하기위한 준비)
            Book book = new Book(null, "스프링", "균");
            String content = new ObjectMapper().writeValueAsString(book);

            when(bookService.saveBook(book)).thenReturn(new Book(1L, "스프링", "균"));

            // When (테스트 실행)
            ResultActions resultActions =
                    mockMvc.perform(MockMvcRequestBuilders.post("/book")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(content)
                            .accept(MediaType.APPLICATION_JSON));


            //then 검증
            resultActions
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("스프링"))
                    .andDo(MockMvcResultHandlers.print());

            ///book 엔드포인트로 POST 요청을 보내고, 컨트롤러가 요청을 처리하고 서비스에 데이터를 저장하는지를 확인합니다. 또한 응답이 예상대로 생성되는지를 검증합니다.
        }


}
