package com.example.boot.Service;

import com.example.boot.Entity.Book;

import java.util.List;

public interface BookService {

    Book saveBook(Book book);

    Book getBookById(Long id);

    List<Book> getAllBookData();

    Book update(Long id,Book book);

   void delete(Long id);
}
