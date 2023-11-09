package com.example.boot.Controller;

import com.example.boot.Dto.FavoriteDTO;

import com.example.boot.Service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/Favorite")
    @CrossOrigin
    public ResponseEntity<?> FavoriteAdd(@RequestBody FavoriteDTO favoriteDTO) {
        favoriteService.FavoriteAdd(favoriteDTO);


        return ResponseEntity.ok("Favorite added successfully");
    }



}
