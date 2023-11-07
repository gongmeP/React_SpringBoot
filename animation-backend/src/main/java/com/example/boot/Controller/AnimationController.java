package com.example.boot.Controller;

import com.example.boot.Entity.Animation;
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
    public ResponseEntity<?> save(@RequestBody Animation animation){ //json


        return new ResponseEntity<>(animationService.saveAni(animation),HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/book")
    public ResponseEntity<?> findAll(@PageableDefault(page = 0,size = 12,sort = "id",direction = Sort.Direction.DESC) Pageable pageable){

        return new ResponseEntity<>(animationService.getAllAniData(pageable),HttpStatus.OK);
    }

    @GetMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> findById(@PathVariable Long id){

        return new ResponseEntity<>(animationService.getAniById(id),HttpStatus.OK);
    }

    @PutMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Animation animation){
        System.out.println(id);
        System.out.println(animation);
        return new ResponseEntity<>(animationService.Aniupdate(id, animation),HttpStatus.CREATED);
    }

    @DeleteMapping("/book/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteById(@PathVariable Long id){



        return new ResponseEntity<>(animationService.Anidelete(id),HttpStatus.CREATED);
    }

  

}
