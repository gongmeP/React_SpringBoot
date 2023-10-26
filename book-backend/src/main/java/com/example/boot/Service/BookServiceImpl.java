package com.example.boot.Service;

import com.example.boot.Entity.Book;
import com.example.boot.Repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Transactional // 서비스 함수 종료될때 commit 할지 rollback 할지 관리
    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }


    @Transactional
    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
    }

    @Transactional
    @Override
    public List<Book> getAllBookData() {
        return bookRepository.findAll();
    }

    @Transactional
    @Override
    public Book update(Long id, Book book) {
        Book bookEntity = bookRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        return bookEntity;
    }


    @Transactional
    @Override
    public String delete(Long id) {
      bookRepository.deleteById(id);
      return "ok";
    }
}