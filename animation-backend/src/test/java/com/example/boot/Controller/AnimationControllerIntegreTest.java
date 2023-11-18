package com.example.boot.Controller;


//통합 테스트 (모든 Bean들을 메모리에 올려 테스트)
//WebEnvironment.MOCK = 가상 톰켓으로 테스트
//WebEnvironment.RANDOM_PORT = 실제 톰켓으로 테스트
//@AutoConfigureMockMvc MockMvc를 메모리등록
//@Transactional 각각의 테스트 함수가 종료될때마다 트랜잭션을 롤백 해줌 독립시행



import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AnimationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Slf4j
@AutoConfigureMockMvc
@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class AnimationControllerIntegreTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AnimationRepository animationRepository;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach // AUTO_INCREMENT 초기화
    public void init(){
//        entityManager.createNativeQuery("ALTER TABLE book ALTER COLUMN id RESTART WITH 1").executeUpdate();
        entityManager.createNativeQuery("ALTER TABLE book AUTO_INCREMENT = 1").executeUpdate();
    }


        @Test
        public void save_Test() throws Exception {
            // Given (테스트 하기위한 준비)
            Animation animation = new Animation(null, "스프링", "균");
            String content = new ObjectMapper().writeValueAsString(animation);


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


    @Test
    public void findAllTest() throws Exception{
        //given 테스트용 데이터
        List<Animation> animationEntities = new ArrayList<>();
        animationEntities.add(new Animation(null,"스프링부트","park"));
        animationEntities.add(new Animation(null,"리엑트","park2"));
        animationEntities.add(new Animation(null,"Junit","park3"));
        animationRepository.saveAll(animationEntities);

//        when(bookService.getAllBookData()).thenReturn(bookRepository.findAll());

        //when 실행
        ResultActions resultActions = mockMvc.perform(get("/book")
                .contentType(MediaType.APPLICATION_JSON_UTF8));

      //  then 검증
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",Matchers.hasSize(3)))
                .andExpect(jsonPath("$.[0].id").value(1))
                .andExpect(jsonPath("$.[2].title").value("Junit"))
                .andDo(MockMvcResultHandlers.print());


    }

    @Test
    public void findById_Test() throws Exception{
        //given
        //넣어둘 테스트용 데이터
        Long id = 2L;

        List<Animation> animationEntities = new ArrayList<>();
        animationEntities.add(new Animation(null,"스프링부트","park"));
        animationEntities.add(new Animation(null,"리엑트","park2"));
        animationEntities.add(new Animation(null,"Junit","park3"));
        animationRepository.saveAll(animationEntities);


        //when
        ResultActions resultActions = mockMvc.perform(get("/book/{id}",id)
                .accept(MediaType.APPLICATION_JSON_UTF8));

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("리엑트"))
                .andDo(MockMvcResultHandlers.print());


    }


    @Test
    public void update_Test() throws Exception{
        //given

        Long id = 1L;

        List<Animation> animationEntities = new ArrayList<>();
        animationEntities.add(new Animation(null,"스프링부트","park"));
        animationEntities.add(new Animation(null,"리엑트","park2"));
        animationEntities.add(new Animation(null,"Junit","park3"));
        animationRepository.saveAll(animationEntities);

        Animation animation = new Animation(null, "수정하기", "균");
        String content = new ObjectMapper().writeValueAsString(animation);


        // When
        ResultActions resultActions =
                mockMvc.perform(put("/book/{id}",id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON));


        //then
        resultActions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("수정하기"))
                .andDo(MockMvcResultHandlers.print());

    }


    @Test
    public void delete_Test() throws Exception{
        //given
        Long id = 1L;
        List<Animation> animationEntities = new ArrayList<>();
        animationEntities.add(new Animation(null,"스프링부트","park"));
        animationEntities.add(new Animation(null,"리엑트","park2"));
        animationEntities.add(new Animation(null,"Junit","park3"));
        animationRepository.saveAll(animationEntities);


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

        assertEquals("ok",result);

    }

}
