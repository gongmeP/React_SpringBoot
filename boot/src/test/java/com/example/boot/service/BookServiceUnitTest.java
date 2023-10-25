package com.example.boot.service;

import com.example.boot.Repository.BookRepository;
import com.example.boot.Service.BookService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

//단위 테스트 (Service 관련 메모리에 등록)
//BookRepository 가짜 객체로 만듦
@ExtendWith(MockitoExtension.class)
public class BookServiceUnitTest {

    @InjectMocks
    //BookService 객체가 만들어질때 BookServiceUnitTest 파일에 @Mock로 등록된 모든 애들을 주입받음
    private BookService bookService;

    @Mock
    private BookRepository bookRepository;

}
