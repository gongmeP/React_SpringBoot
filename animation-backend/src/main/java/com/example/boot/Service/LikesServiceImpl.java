package com.example.boot.Service;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Likes;
import com.example.boot.Repository.AniReviewRepository;
import com.example.boot.Repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {

    private final AniReviewRepository aniReviewRepository;
    private final LikesRepository likesRepository;


    @Override
    public String ReviewLikeUp(AniReview aniReview) {
        try {
            AniReview ReAniReview = aniReviewRepository.findByReviewId(aniReview.getReviewId());
            Likes likes = likesRepository.findByAniReviewAndMemberMid(ReAniReview,aniReview.getMemberMid());

            Long oldLike = ReAniReview.getLikes();

            if (likes != null) {
                likesRepository.delete(likes);
                ReAniReview.setLikes(oldLike - 1);
                aniReviewRepository.save(ReAniReview);
                return "좋아요 취소";
            } else {
                likes = Likes.builder()
                        .aniReview(ReAniReview)
                        .memberMid(aniReview.getMemberMid())
                        .likeTime(LocalDateTime.now())
                        .build();

                likesRepository.save(likes);

                ReAniReview.setLikes(oldLike + 1);
                aniReviewRepository.save(ReAniReview);
                return "좋아요 성공";
            }
        }catch (Exception e) {
            System.out.println("LikesService ReviewLikeUp 에러");
            return "좋아요 에러";
        }

    }

    @Override
    public List<Likes> ReviewLikeCheck(AniReview aniReview) {
        try{
            List<Likes> likes = likesRepository.findByMemberMid(aniReview.getMemberMid());
            if(likes != null){
                return likes;
            }else{
                return null;
            }
        }catch (Exception e){
            System.out.println("LikesService ReviewLikeCheck 에러");
            return null;
        }
    }
}
