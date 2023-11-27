package com.example.boot.Controller;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Animation;
import com.example.boot.Service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class LikesController {

   private final LikesService likesService;


   @PostMapping("/Ani/ReviewLikeUp")
   @CrossOrigin
   public ResponseEntity<?> ReviewLikeUp(@RequestBody AniReview aniReview) {

       System.out.println(aniReview.getReviewId());

       return new ResponseEntity<>(likesService.ReviewLikeUp(aniReview), HttpStatus.OK);
   }




}
