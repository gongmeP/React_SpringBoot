package com.example.boot.Controller;

import com.example.boot.Entity.Book;
import com.example.boot.Service.AnimationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // post get

import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertEquals;



@WebMvcTest
public class AnimationControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnimationService animationService;

    @Test
    public void save_Test() throws Exception {
        // Given (테스트 하기위한 준비)
        Book book = new Book(null, "스프링", "균");
        String content = new ObjectMapper().writeValueAsString(book);

        when(animationService.saveBook(book)).thenReturn(new Book(1L, "스프링", "균"));

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

        when(animationService.getAllBookData()).thenReturn(books);

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

    @Test
    public void findById_Test() throws Exception{
        //given
        Long id = 1L;
        when(animationService.getBookById(id)).thenReturn(new Book(1L,"자바","kyun"));

        //when
        ResultActions resultActions = mockMvc.perform(get("/book/{id}",id)
                .accept(MediaType.APPLICATION_JSON_UTF8));

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("자바"))
                .andDo(MockMvcResultHandlers.print());


    }

    @Test
    public void update_Test() throws Exception{
        //given
        Long id = 1L;
        Book book = new Book(null, "수정하기", "균");
        String content = new ObjectMapper().writeValueAsString(book);
        when(animationService.update(id,book)).thenReturn(new Book(1L, "수정하기", "균"));

        // When
        ResultActions resultActions =
                mockMvc.perform(put("/book/{id}",id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON));


        //then
        resultActions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("수정하기"))
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    public void delete_Test() throws Exception{
        //given
        Long id = 1L;


        when(animationService.delete(id)).thenReturn("ok");

        // When
        ResultActions resultActions =
                mockMvc.perform(delete("/book/{id}",id)
                        .accept(MediaType.TEXT_PLAIN));

        //then
        resultActions
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());

        MvcResult requestResult = resultActions.andReturn();
        String result = requestResult.getResponse().getContentAsString();

        assertEquals("ok", result);

    }
}
