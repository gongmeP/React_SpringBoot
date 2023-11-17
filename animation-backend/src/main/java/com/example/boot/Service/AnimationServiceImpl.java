package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AnimationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@Service
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    @Transactional
    @Override
    public Animation saveAni(Animation animation) {

        return animationRepository.save(animation);
    }


    @Transactional
    @Override
    public Animation getAniById(Long id) {
        return animationRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
    }

    @Override
    @Transactional
    public List<Animation> getDayOfWeek(String day_of_week) {
        String uploaded = "y";
        return animationRepository.findByDayOfWeekAndUploaded(day_of_week,uploaded);
    }

    @Transactional
    @Override
    public Page<Animation> getAllAniData(Pageable pageable) {
        return animationRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public List<Animation> getAllAniDataALL() {

        return animationRepository.findByAnidelete("n");

    }

    @Transactional
    @Override
    public Animation Aniupdate(Long id, Animation animation) {
        Animation animationEntityEntity = animationRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 없음"));
        animationEntityEntity.setTitle(animation.getTitle());

        return animationEntityEntity;
    }


    @Transactional
    @Override
    public String DeleteY(Long id) {
        try{

           Animation animation = animationRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("ID 없음"));
           animation.setAnidelete("y");
           animationRepository.save(animation);
            return "삭제완료";
        }catch (Exception e){
            return "삭제실패";
        } 
    }


    @Override
    public List<Animation> SearchByTitle(String Title) {

      return  animationRepository.searchByTitleContainingAndAnidelete(Title,"n");

    }


    @Override
    public List<Animation> GenreFilterByTitle(List<String> genre) {


        return  animationRepository.findByGenreIn(genre);
    }

    @Override
    public String ViewCounterupdate(Long id) {
        try{
            Animation animation = animationRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("ID 없음"));
            Long viewcount = animation.getViewCount();
            viewcount = viewcount + 1;
            animation.setViewCount(viewcount);
            animation.setViewedTime(LocalDateTime.now());
            animationRepository.save(animation);
            return "ViewCount 업데이트 성공";
        }catch (Exception e){
            return "ViewCounterupdate 에러";
        }
    }

    
    
    // 일일랭킹 데이터 부족 이후 개발
    @Override
    public List<Animation> ViewRanking() {
        try{
            LocalDateTime oneDay = LocalDateTime.now().minusDays(1);
            Pageable pageable = PageRequest.of(0,10);
            List<Animation> animationsBefore = animationRepository.findByViewedTimeBefore(oneDay);
            List<Animation> animationsAfter = animationRepository.findByViewedTimeAfter(oneDay);
            List<Animation> result = new ArrayList<>();

            for (Animation animationBefore : animationsBefore) {
                for (Animation animationAfter : animationsAfter) {
                    // ID가 같은 경우에만 계산
//                    if (animationBefore.getId().equals(animationAfter.getId())) {

                        // Animation 복사
                        Animation resultAnimation = new Animation();
                        // 필요한 필드 복사
                        resultAnimation.setId(animationBefore.getId());
                        resultAnimation.setTitle(animationBefore.getTitle());


                        // viewCount 차이 계산
                        long viewCountDifference = animationAfter.getViewCount() - animationBefore.getViewCount();
                        resultAnimation.setViewCount(viewCountDifference);

                        // 결과 리스트에 추가
                        result.add(resultAnimation);

                        break; // 중복을 피하기 위해 ID가 일치하는 첫 번째 Animation만 계산
//                    }
                }
            }

            System.out.println(result);
            return result;
        }catch (Exception e){
            System.out.println("AniService ViewRanking 에러");
            return null;
        }

    }

    @Override
    public List<Animation> AllViewRanking() {
        try{
             List<Animation> animations =  animationRepository.findTop10ByOrderByViewCountDesc();
            return animations;
        }catch (Exception e){
            System.out.println("AniService ViewALLRanking 에러");
            return null;
        }
    }
}
