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
               aniReview.setRating(aniReviewDTO.getRating());
                aniReviewRepository.save(aniReview);
            }else{
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
        System.out.println(aniReviewDTO.getAni_id());
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

            if(!aniReview.getReviewText().isEmpty()){

                return "기존 리뷰 존재";

            }else{

                aniReview.setReviewText(aniReviewDTO.getReviewText());
                aniReview.setLikes(0L);
                aniReview.setReviewDelete("n");
                aniReview.setReviewDate(LocalDateTime.now());
                aniReviewRepository.save(aniReview);

                return "리뷰 저장됨";
            }

        }catch (Exception e){
            System.out.println("AniReviewService ReviewTextAdd 에러");

            return null;
        }

    }
}
