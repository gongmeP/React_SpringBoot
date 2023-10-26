package com.example.boot.Repository;


import com.example.boot.Entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.transaction.Transactional;

//단위 테스트 (DB 데이터 메모리에 등록)

@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY) // 가짜 DB로 테스트 , Replace.NONE 은 실제 DB로 테스트
@DataJpaTest // Repository들을 메모리에 등록해줌
public class BookRepositoryUnitTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void save_test(){
        Book book = new Book(null,"123","1234");

        Book bookEntity = bookRepository.save(book);

        assertEquals("123",bookEntity.getTitle());
    }

}
