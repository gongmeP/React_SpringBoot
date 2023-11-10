package com.example.boot.Service;

import com.example.boot.Dto.FavoriteDTO;
import com.example.boot.Entity.Favorite;

public interface FavoriteService {
    void FavoriteAdd(FavoriteDTO favoriteDTO);

    void FavoriteDelete(FavoriteDTO favoriteDTO);

    Favorite FavoriteCheck(FavoriteDTO favoriteDTO);
}
