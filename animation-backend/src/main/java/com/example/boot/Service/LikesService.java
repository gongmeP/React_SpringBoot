package com.example.boot.Service;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Likes;

import java.util.List;

public interface LikesService {

   String ReviewLikeUp(AniReview aniReview);

   List<Likes> ReviewLikeCheck(AniReview aniReview);
}
