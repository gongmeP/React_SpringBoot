package com.example.boot.Controller;

import com.example.boot.Entity.Book;
import com.example.boot.Service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // post get

import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@WebMvcTest
public class BookControllerUnitTest {

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
                mockMvc.perform(post("/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON));


        //then 검증
        resultActions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("스프링"))
                .andDo(MockMvcResultHandlers.print());

        ///book 엔드포인트로 POST 요청을 보내고, 컨트롤러가 요청을 처리하고 서비스에 데이터를 저장하는지를 확인합니다. 또한 응답이 예상대로 생성되는지를 검증합니다.
    }

    @Test
    public void findAllTest() throws Exception{
        //given 테스트용 데이터
        List<Book> books = new ArrayList<>();
        books.add(new Book(1L,"스프링부트","park"));
        books.add(new Book(2L,"리엑트","park2"));

        when(bookService.getAllBookData()).thenReturn(books);

        //when 실행
        ResultActions resultActions = mockMvc.perform(get("/book")
                .accept(MediaType.APPLICATION_JSON_UTF8));

        //then 검증
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(2)))
                .andExpect(jsonPath("$.[0].title").value("스프링부트"))
                .andDo(MockMvcResultHandlers.print());
    }
}
