package com.example.boot.Service;

import com.example.boot.Dto.AniReviewDTO;
import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Member;
import com.example.boot.Repository.AniReviewRepository;
import com.example.boot.Repository.AnimationRepository;
import com.example.boot.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AniReviewServiceImpl implements  AniReviewService {

    private final AniReviewRepository aniReviewRepository;
    private final MemberRepository memberRepository;
    private final AnimationRepository animationRepository;

    @Override
    public String saveReviewRating(AniReviewDTO aniReviewDTO) {
        try {

            Optional<Member> members = memberRepository.findByMid(aniReviewDTO.getMember_mid());
            Member member = members.orElseThrow(() -> new NotFoundException("미존재 맴버에요 " + aniReviewDTO.getMember_mid()));

            Animation animation = animationRepository.findById(aniReviewDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("미존재 애니메이션 이에요" + aniReviewDTO.getAni_id()));

            AniReview aniReview = aniReviewRepository.findByMemberAndAnimation(member,animation);
            if(aniReview != null){

                //기존 별점에 현재 별점 평균값 계산
                double oldRating = aniReview.getRating();
                double newRating = aniReviewDTO.getRating();
                double totalRating = animation.getAverageRating();
                Long ReviewEA = aniReviewRepository.countByAnimationTitle(animation.getTitle());
                double newAverageRating ;
                if(oldRating-newRating==0){
                     newAverageRating = (totalRating);
                }else{
                    newAverageRating = ((totalRating * ReviewEA - oldRating) + newRating) / ReviewEA;
                }

                //계산 해서 애니메이션 레이팅에 세이브
                animation.setAverageRating(newAverageRating);

                //지금 온 별점 저장
                aniReview.setRating(aniReviewDTO.getRating());
                aniReviewRepository.save(aniReview);
            }else{


                //기존 별점이 없을경우 .
                double newRating = aniReviewDTO.getRating();
                double totalRating = animation.getAverageRating();
                Long ReviewEA = aniReviewRepository.countByAnimationTitle(animation.getTitle());
                double newAverageRating;
                if (ReviewEA == 0) {
                    newAverageRating = newRating;
                } else {
                    newAverageRating = (totalRating * ReviewEA + newRating) / (ReviewEA + 1);
                }

                animation.setAverageRating(newAverageRating);

                aniReview = AniReview.builder()
                        .member(member)
                        .animation(animation)
                        .memberMid(member.getMid())
                        .animationTitle(animation.getTitle())
                        .rating(aniReviewDTO.getRating())
                        .build();
                aniReviewRepository.save(aniReview);

            }
            
            return "별점 저장 완료";

        }catch (Exception e){

            return "별점 저장 실패";
        }
    }

    @Override
    public Double getMystarRating(AniReviewDTO aniReviewDTO) {

        try{
            if(aniReviewDTO.getMember_mid() == null || aniReviewDTO.getAni_id() ==null ){
                return 0D;
            }
            Optional<Member> members = memberRepository.findByMid(aniReviewDTO.getMember_mid());
            Member member = members.orElseThrow(() -> new NotFoundException("미존재 맴버에요 " + aniReviewDTO.getMember_mid()));
            Animation animation = animationRepository.findById(aniReviewDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("미존재 애니메이션 이에요" + aniReviewDTO.getAni_id()));
            AniReview aniReview = aniReviewRepository.findByMemberAndAnimation(member,animation);

            if(aniReview != null){

                return aniReview.getRating();
            }else{
                return 0D;
            }
        }catch (Exception e){

            System.out.println("AniReviewService getMystarRating 에러");

            return null;
        }
    }

    @Override
    public String ReviewTextAdd(AniReviewDTO aniReviewDTO) {
        try{
            Optional<Member> members = memberRepository.findByMid(aniReviewDTO.getMember_mid());
            Member member = members.orElseThrow(() -> new NotFoundException("미존재 맴버에요 " + aniReviewDTO.getMember_mid()));
            Animation animation = animationRepository.findById(aniReviewDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("미존재 애니메이션 이에요" + aniReviewDTO.getAni_id()));
            AniReview aniReview = aniReviewRepository.findByMemberAndAnimation(member,animation);

            if (aniReview == null){

                return "별점 먼저 체크";

            }else{

                if(aniReview.getReviewText()!=null){

                    return "기존 리뷰 존재";

                }else{

                    aniReview.setReviewText(aniReviewDTO.getReviewText());
                    aniReview.setLikes(0L);
                    aniReview.setReviewDelete("n");
                    aniReview.setReviewDate(LocalDateTime.now());
                    aniReviewRepository.save(aniReview);

                    return "리뷰 저장됨";
                }

            }
        }catch (Exception e){
            System.out.println("AniReviewService ReviewTextAdd 에러");

            return null;
        }


    }


    @Override
    public List<AniReview> ReviewListGetDataNew(AniReviewDTO aniReviewDTO) {
        try{
            Animation animation = animationRepository.findById(aniReviewDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("미존재 애니메이션 이에요" + aniReviewDTO.getAni_id()));
            List<AniReview> aniReview = aniReviewRepository.findByAnimationAndReviewDeleteOrderByReviewDateDesc(animation,"n");

            return aniReview;
        }catch (Exception e){
            System.out.println("AniReviewService ReviewListGetData 에러");

            return null;
        }
    }
    @Override
    public List<AniReview> ReviewListGetDataOderByLike(AniReviewDTO aniReviewDTO) {
        try{
            Animation animation = animationRepository.findById(aniReviewDTO.getAni_id())
                    .orElseThrow(() -> new NotFoundException("미존재 애니메이션 이에요" + aniReviewDTO.getAni_id()));
            List<AniReview> aniReview = aniReviewRepository.findByAnimationAndReviewDeleteOrderByLikesDesc(animation,"n");

            return aniReview;
        }catch (Exception e){
            System.out.println("AniReviewService ReviewListGetData 에러");

            return null;
        }
    }


    @Override
    public Long MemberReviewEA(AniReview aniReview) {
        try{
            Long MemberReviewEA = aniReviewRepository.countByMemberMidAndReviewTextIsNotNull(aniReview.getMemberMid());

          return MemberReviewEA;
        }catch (Exception e){
            System.out.println("AniReviewService MemberReviewEA 에러");
            return null;
        }
    }

    @Override
    public Long MemberReviewStarEA(AniReview aniReview) {
        try{
            Long MemberReviewEA = aniReviewRepository.countByMemberMid(aniReview.getMemberMid());
            return MemberReviewEA;
        }catch (Exception e){
            System.out.println("AniReviewService MemberReviewStarEA 에러");
            return null;
        }
    }

    @Override
    public String  ReviewUpdate(AniReview aniReview) {
        try{
            
            AniReview ReviewUpdate = aniReviewRepository.findByReviewId(aniReview.getReviewId());
            System.out.println(aniReview.getReviewText());
            if(ReviewUpdate != null){
                ReviewUpdate.setReviewText(aniReview.getReviewText());
                aniReviewRepository.save(ReviewUpdate);
                return "리뷰업데이트 완료";
            }else{
                return "review데이터 없음";
            }
        }catch (Exception e){
            System.out.println("AniReviewService ReviewUpdate 에러");
            return "리뷰업데이트 실패";
        }
    }

    @Override
    public String ReviewDelete(AniReview aniReview) {
        try{
            AniReview ReviewUpdate = aniReviewRepository.findByReviewId(aniReview.getReviewId());

            if(ReviewUpdate != null){
                ReviewUpdate.setReviewDelete("y");
                aniReviewRepository.save(ReviewUpdate);
                return "리뷰삭제 완료";
            }else{
                return "review데이터 없음";
            }
        }catch (Exception e){
            System.out.println("AniReviewService ReviewDelete 에러");
            return "리뷰삭제 실패";
        }
    }
}
