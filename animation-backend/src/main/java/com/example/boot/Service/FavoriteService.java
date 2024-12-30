package com.example.boot.Service;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;

import java.util.List;

public interface FavoriteService {
    void FavoriteAdd(FavoriteDTO favoriteDTO);

    void FavoriteDelete(FavoriteDTO favoriteDTO);

    Favorite FavoriteCheck(FavoriteDTO favoriteDTO);

    List<Animation> FavoriteList (String userid);
}
