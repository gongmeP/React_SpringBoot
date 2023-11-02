package com.example.boot.Service;

import com.example.boot.Entity.Book;
import com.example.boot.Repository.AnimationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    @Transactional // 서비스 함수 종료될때 commit 할지 rollback 할지 관리
    @Override
    public Book saveBook(Book book) {
        return animationRepository.save(book);
    }


    @Transactional
    @Override
    public Book getBookById(Long id) {
        return animationRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
    }

    @Transactional
    @Override
    public Page<Book> getAllBookData(Pageable pageable) {
        return animationRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public Book update(Long id, Book book) {
        Book bookEntity = animationRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        return bookEntity;
    }


    @Transactional
    @Override
    public String delete(Long id) {
      animationRepository.deleteById(id);
      return "ok";
    }


}
