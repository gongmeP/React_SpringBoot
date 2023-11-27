package com.example.boot.Service;

import com.example.boot.Dto.AniReviewDTO;
import com.example.boot.Entity.AniReview;

import java.util.List;


public interface AniReviewService {

    String saveReviewRating(AniReviewDTO aniReviewDTO);
    Double getMystarRating(AniReviewDTO aniReviewDTO);
    String  ReviewTextAdd(AniReviewDTO aniReviewDTO);

    List<AniReview> ReviewListGetData(AniReviewDTO aniReviewDTO);

}
