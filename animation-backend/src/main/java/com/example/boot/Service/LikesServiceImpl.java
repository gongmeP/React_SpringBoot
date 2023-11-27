package com.example.boot.Service;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Likes;
import com.example.boot.Repository.AniReviewRepository;
import com.example.boot.Repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {

    private final AniReviewRepository aniReviewRepository;
    private final LikesRepository likesRepository;


    @Override
    public String ReviewLikeUp(AniReview aniReview) {
        AniReview ReAniReview = aniReviewRepository.findByReviewId(aniReview.getReviewId());
        Likes likes = likesRepository.findByAniReview(ReAniReview);

        Long oldLike = ReAniReview.getLikes();

        if(likes != null){
            likesRepository.delete(likes);
            ReAniReview.setLikes(oldLike-1);
            aniReviewRepository.save(ReAniReview);
            return "좋아요 취소";
        }else{
            likes = Likes.builder()
                    .aniReview(ReAniReview)
                    .memberMid(ReAniReview.getMemberMid())
                    .likeTime(LocalDateTime.now())
                    .build();

            likesRepository.save(likes);

            ReAniReview.setLikes(oldLike+1);
            aniReviewRepository.save(ReAniReview);
            return "좋아요 성공";
        }

    }
}
