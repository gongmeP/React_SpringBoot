package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import com.example.boot.Entity.AnimationViewCount;
import com.example.boot.Repository.AnimationRepository;
import com.example.boot.Repository.AnimationViewCounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;
    private final AnimationViewCounterRepository animationViewCounterRepository;

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
        return animationRepository.findByDayOfWeekAndUploadedAndAnidelete(day_of_week,uploaded,"n");
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
            //총 뷰수 업데이트
            Animation animation = animationRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("ID 없음"));
            Long viewcount = animation.getViewCount();
            viewcount = viewcount + 1;
            animation.setViewCount(viewcount);
            animation.setViewedTime(LocalDateTime.now());
            animationRepository.save(animation);

            //New 테이블 설계한거 업데이트 하는곳
            LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
            AnimationViewCount NewViewCount = animationViewCounterRepository.findByAnimationIdAndDate(id, today);

            if(NewViewCount == null){
                NewViewCount = new AnimationViewCount();
                NewViewCount.setAnimation(animation);
                NewViewCount.setDate(today);
                NewViewCount.setViewCount(1L);
                animationViewCounterRepository.save(NewViewCount);
            }else{
               Long reviewCount = NewViewCount.getViewCount();
                reviewCount = reviewCount + 1;
                NewViewCount.setViewCount(reviewCount);
                animationViewCounterRepository.save(NewViewCount);
            }

            return "ViewCount 업데이트 성공";
        }catch (Exception e){
            return "ViewCounterupdate 에러";
        }
    }


    @Override
    public List<Animation> AllViewRanking() {
        try{
             List<AnimationViewCount> animations =  animationViewCounterRepository.findTop10ByOrderByViewCountDesc();

            List<Animation> getanimation = animations.stream()
                    .filter(upload-> !"n".equals(upload.getAnimation().getUploaded()))
                    .map(AnimationViewCount::getAnimation)
                    .collect(Collectors.toList());

            return getanimation;
        }catch (Exception e){
            System.out.println("AniService ViewALLRanking 에러");
            return null;
        }
    }

    @Override
    public List<Animation> AniOneDayRanking() {
        try{
            LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
            List<AnimationViewCount> animations =  animationViewCounterRepository.findTop10ByDateOrderByViewCountDesc(today);
            List<Animation> getanimation = animations.stream()
                    .filter(upload-> !"n".equals(upload.getAnimation().getUploaded()))
                    .map(AnimationViewCount::getAnimation)
                    .collect(Collectors.toList());

            return getanimation;
        }catch (Exception e){
            System.out.println("AniService AniOneDayRanking 에러");
            return null;
        }
    }

    @Override
    public List<Animation> AniWeekRanking() {
        try{
            LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
            LocalDateTime Week= LocalDateTime.now().minusDays(7).withHour(0).withMinute(0).withSecond(0).withNano(0);

            List<AnimationViewCount> animations =  animationViewCounterRepository.findTop10ByDateBetweenOrderByViewCountDesc(Week,today);
            List<Animation> getanimation = animations.stream()
                    .filter(upload-> !"n".equals(upload.getAnimation().getUploaded()))
                    .map(AnimationViewCount::getAnimation)
                    .collect(Collectors.toList());

            return getanimation;
        }catch (Exception e){
            System.out.println("AniService AniWeekRanking 에러");
            return null;
        }
    }
}
