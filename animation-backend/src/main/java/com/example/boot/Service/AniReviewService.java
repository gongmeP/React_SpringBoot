package com.example.boot.Service;

import com.example.boot.Dto.AniReviewDTO;


public interface AniReviewService {

    String saveReviewRating(AniReviewDTO aniReviewDTO);
    Double getMystarRating(AniReviewDTO aniReviewDTO);
    String  ReviewTextAdd(AniReviewDTO aniReviewDTO);

}
