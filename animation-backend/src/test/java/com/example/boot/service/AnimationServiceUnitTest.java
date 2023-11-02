package com.example.boot.service;

import com.example.boot.Entity.Book;
import com.example.boot.Repository.AnimationRepository;
import com.example.boot.Service.AnimationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

//단위 테스트 (Service 관련 메모리에 등록)
//BookRepository 가짜 객체로 만듦
@ExtendWith(MockitoExtension.class)
public class AnimationServiceUnitTest {


    @InjectMocks
    //BookService 객체가 만들어질때 BookServiceUnitTest 파일에 @Mock로 등록된 모든 애들을 주입받음
    private AnimationService animationService;

    @Mock
    private AnimationRepository animationRepository;

    //BODMocikto방식
    //given
    @Test
    public  void save_test(){
        Book book = new Book();
        book.setTitle("책제목");
        book.setAuthor("책저자1");
        
        //stub - 동작 지정
        when(animationRepository.save(book)).thenReturn(book);

        //test execute
        Book bookEntity = animationService.saveBook(book);

        //then
        assertEquals(bookEntity,book);
    }

}
