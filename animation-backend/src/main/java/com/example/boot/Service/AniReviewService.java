package com.example.boot.Service;

import com.example.boot.Dto.AniReviewDTO;
import com.example.boot.Entity.AniReview;

import java.util.List;


public interface AniReviewService {

    String saveReviewRating(AniReviewDTO aniReviewDTO);
    Double getMystarRating(AniReviewDTO aniReviewDTO);
    String  ReviewTextAdd(AniReviewDTO aniReviewDTO);

    List<AniReview> ReviewListGetDataNew(AniReviewDTO aniReviewDTO);

    List<AniReview> ReviewListGetDataOderByLike(AniReviewDTO aniReviewDTO);
    Long MemberReviewEA(AniReview aniReview);

    Long MemberReviewStarEA(AniReview aniReview);
    String ReviewUpdate(AniReview aniReview);

    String ReviewDelete(AniReview aniReview);
}
