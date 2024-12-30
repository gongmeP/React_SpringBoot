package com.example.boot.Controller;

import com.example.boot.Dto.FavoriteDTO;

import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;
import com.example.boot.Service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/Favorite")
    @CrossOrigin
    public ResponseEntity<?> FavoriteAdd(@RequestBody FavoriteDTO favoriteDTO) {
        favoriteService.FavoriteAdd(favoriteDTO);
        return ResponseEntity.ok("Favorite add successfully");
    }

    @PostMapping("/Favorite/Delete")
    @CrossOrigin
    public ResponseEntity<?> FavoriteDelete(@RequestBody FavoriteDTO favoriteDTO) {
        favoriteService.FavoriteDelete(favoriteDTO);


        return ResponseEntity.ok("Favorite delete successfully");
    }


    @PostMapping("/Favorite/Check")
    @CrossOrigin
    public ResponseEntity<?> FavoriteCheck(@RequestBody FavoriteDTO favoriteDTO) {

        Favorite favorite =  favoriteService.FavoriteCheck(favoriteDTO);

        if (favorite != null) {
            return ResponseEntity.status(HttpStatus.OK).body("보관함 있음");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("보관함 없음");
        }

    }

    @GetMapping("/FavoriteList")
    @CrossOrigin
    public ResponseEntity<?> FavoriteList(@RequestParam String userid) {

        List<Animation> animationlist =  favoriteService.FavoriteList(userid);


        if (animationlist != null) {
            return ResponseEntity.ok(animationlist);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("보관함 없음");
        }
    }




}
