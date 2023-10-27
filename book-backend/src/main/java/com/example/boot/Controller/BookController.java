package com.example.boot.Controller;

import com.example.boot.Entity.Book;
import com.example.boot.Service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    @PostMapping("/book")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody Book book){ //json


        return new ResponseEntity<>(bookService.saveBook(book),HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/book")
    public ResponseEntity<?> findAll(){

        return new ResponseEntity<>(bookService.getAllBookData(),HttpStatus.OK);
    }

    @GetMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> findById(@PathVariable Long id){

        return new ResponseEntity<>(bookService.getBookById(id),HttpStatus.OK);
    }

    @PutMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Book book){

        return new ResponseEntity<>(bookService.update(id,book),HttpStatus.CREATED);
    }

    @DeleteMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteById(@PathVariable Long id){

        return new ResponseEntity<>(bookService.delete(id),HttpStatus.CREATED);
    }

}
