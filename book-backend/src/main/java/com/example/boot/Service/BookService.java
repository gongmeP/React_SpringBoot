package com.example.boot.Service;

import com.example.boot.Entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    Book saveBook(Book book);

    Book getBookById(Long id);

    Page<Book> getAllBookData(Pageable pageable);

    Book update(Long id,Book book);

    String delete(Long id);
}
