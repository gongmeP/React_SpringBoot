package com.example.boot.Controller;
import com.example.boot.Dto.AniReviewDTO;
import com.example.boot.Service.AniReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AniReviewController {

    private final AniReviewService aniReviewService;

    @PostMapping("/Ani/ReviewRating")
    @CrossOrigin
    public ResponseEntity<?> ReviewRaring(@RequestBody AniReviewDTO aniReviewDTO){

        return new ResponseEntity<>(aniReviewService.saveReviewRating(aniReviewDTO), HttpStatus.OK);
    }

    @PostMapping("/Ani/MystarRating")
    @CrossOrigin
    public ResponseEntity<?> MystarRating(@RequestBody AniReviewDTO aniReviewDTO){

        return new ResponseEntity<>(aniReviewService.getMystarRating(aniReviewDTO), HttpStatus.OK);
    }

    @PostMapping("/Ani/ReviewTextAdd")
    @CrossOrigin
    public ResponseEntity<?> ReviewTextAdd(@RequestBody AniReviewDTO aniReviewDTO){

        return new ResponseEntity<>(aniReviewService.ReviewTextAdd(aniReviewDTO), HttpStatus.OK);
    }


}
