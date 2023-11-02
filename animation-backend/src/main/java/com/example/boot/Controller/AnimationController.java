package com.example.boot.Controller;

import com.example.boot.Entity.Book;
import com.example.boot.Service.AnimationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AnimationController {

    private final AnimationService animationService;

    @PostMapping("/book")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody Book book){ //json


        return new ResponseEntity<>(animationService.saveBook(book),HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/book")
    public ResponseEntity<?> findAll(@PageableDefault(page = 0,size = 12,sort = "id",direction = Sort.Direction.DESC) Pageable pageable){

        return new ResponseEntity<>(animationService.getAllBookData(pageable),HttpStatus.OK);
    }

    @GetMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> findById(@PathVariable Long id){

        return new ResponseEntity<>(animationService.getBookById(id),HttpStatus.OK);
    }

    @PutMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Book book){
        System.out.println(id);
        System.out.println(book);
        return new ResponseEntity<>(animationService.update(id,book),HttpStatus.CREATED);
    }

    @DeleteMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteById(@PathVariable Long id){



        return new ResponseEntity<>(animationService.delete(id),HttpStatus.CREATED);
    }

  

}
