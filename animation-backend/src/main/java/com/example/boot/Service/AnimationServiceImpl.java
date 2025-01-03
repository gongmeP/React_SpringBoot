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
import java.util.*;
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
    public List<Animation> getAllAniDataALL(Pageable pageable, String admin) {

        try{
            List<Animation> anilist;
            if(admin.equals("no")){
             anilist =  animationRepository.findByAnideleteAndUploadedOrderByIdDesc("n","y",pageable);

            }else{
                anilist =  animationRepository.findByAnideleteOrderByIdDesc("n",pageable);
            }
            if(anilist == null){
                return null;
            }
            return anilist;

        }catch (Exception e){
            return null;
        }
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
    public List<Animation> SearchByTitle(String Title,String admin) {

        if(admin.equals("no")){
            return  animationRepository.searchByTitleContainingAndAnideleteAndUploadedOrderByIdDesc(Title,"n","y");
        }else{
            return  animationRepository.searchByTitleContainingAndAnideleteOrderByIdDesc(Title,"n");
        }


    }


    @Override
    public List<Animation> GenreFilterByTitle(List<String> genre,String admin) {

        if(admin.equals("admin")){
            return  animationRepository.findByGenreIn(genre);

        }else{
            return  animationRepository.findByGenreInAndUploaded(genre,"y");
        }

    }

    @Override
    public String ViewCounterupdate(Long id) {
        try{

            Animation animation = animationRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("ID 없음"));

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

            //총 뷰수 업데이트
            List<AnimationViewCount> viewcountList = animationViewCounterRepository.findByAnimationId(id);
            Long totalViewCount = 0L;
            for(AnimationViewCount viewcount :  viewcountList){
                totalViewCount += viewcount.getViewCount();
            }
            animation.setViewCount(totalViewCount);
            animation.setViewedTime(LocalDateTime.now());
            animationRepository.save(animation);


            return "ViewCount 업데이트 성공";
        }catch (Exception e){
            return "ViewCounterupdate 에러";
        }
    }


    @Override
    public List<Animation> AllViewRanking() {
        try{
             List<AnimationViewCount> animations =  animationViewCounterRepository.findByOrderByViewCountDesc();

            //뷰 카운터 합산
            Map<String,Long> animationsViewSum = new HashMap<>();

            for(AnimationViewCount animationViewCount : animations){
                Animation animation = animationViewCount.getAnimation();

                //업로드 n인건 거르기
                if(!"n".equals(animation.getUploaded())){
                    String animationTitle = animation.getTitle();
                    Long aniviewCount = animationViewCount.getViewCount();
                    animationsViewSum.merge(animationTitle,aniviewCount,Long::sum);
                }

            }
            //합산한 애니데이터 다시 생성 후 리턴
            List<Animation> reAni = animationsViewSum.entrySet().stream()
                    .map(entry->{

                        //합산한 애니메이션과 기존 애니메이션 의 이름이 같은거 다시 거르기
                        Animation getanimation = animations.stream()
                                .filter(eqlus-> eqlus.getAnimation().getTitle().equals(entry.getKey()))
                                .findFirst()
                                .map(AnimationViewCount::getAnimation)
                                .orElse(null);

                        if (getanimation != null) {
                            getanimation.setViewCount(entry.getValue());
                        }

                        return getanimation;
                    }).filter(Objects::nonNull)
                    .sorted(Comparator.comparingLong(Animation::getViewCount).reversed()) // 뷰 카운터 내림차순 정렬
                    .collect(Collectors.toList());

            List<Animation> top10 = reAni.stream()
                    .sorted(Comparator.comparingLong(Animation::getViewCount).reversed())
                    .limit(10)
                    .collect(Collectors.toList());

            return top10;
        }catch (Exception e){
            System.out.println("AniService AllViewRanking 에러");
            return null;
        }
    }

    @Override
    public List<Animation> ALLOderByConter(Pageable pageable,String admin) {
        try{
            List<Animation> animations;
            if(admin.equals("no")){
              animations =  animationRepository.findByAnideleteAndUploadedOrderByViewCountDesc("n","y",pageable);

            }else{
              animations =  animationRepository.findByAnideleteOrderByViewCountDesc("n",pageable);
            }

            if(animations==null){
                return null;
            }

            return animations;
        }catch (Exception e){
            System.out.println("AniService ALLOderByConter 에러");
            return null;
        }
    }

    @Override
    public List<Animation> AniOneDayRanking() {
        try{
            LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

            List<AnimationViewCount> animations = animationViewCounterRepository.findTop10ByDateOrderByViewCountDesc(today);

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

            List<AnimationViewCount> animations =  animationViewCounterRepository.findByDateBetweenOrderByViewCountDesc(Week,today);

            //뷰 카운터 합산
            Map<String,Long> animationsViewSum = new HashMap<>();

            for(AnimationViewCount animationViewCount : animations){
                Animation animation = animationViewCount.getAnimation();

                //업로드 n인건 거르기
                if(!"n".equals(animation.getUploaded())){
                    String animationTitle = animation.getTitle();
                    Long aniviewCount = animationViewCount.getViewCount();
                    animationsViewSum.merge(animationTitle,aniviewCount,Long::sum);
                }

            }
            //합산한 애니데이터 다시 생성 후 리턴
            List<Animation> reAni = animationsViewSum.entrySet().stream()
                    .map(entry->{

                        //합산한 애니메이션과 기존 애니메이션 의 이름이 같은거 다시 거르기
                        Animation getanimation = animations.stream()
                                .filter(eqlus-> eqlus.getAnimation().getTitle().equals(entry.getKey()))
                                .findFirst()
                                .map(AnimationViewCount::getAnimation)
                                .orElse(null);
                        
                        if (getanimation != null) {
                            getanimation.setViewCount(entry.getValue());
                        }

                        return getanimation;
                    }).filter(Objects::nonNull)
                    .sorted(Comparator.comparingLong(Animation::getViewCount).reversed()) // 뷰 카운터 내림차순 정렬
                    .collect(Collectors.toList());

            List<Animation> top10 = reAni.stream()
                    .sorted(Comparator.comparingLong(Animation::getViewCount).reversed())
                    .limit(10)
                    .collect(Collectors.toList());

            return top10;
        }catch (Exception e){
            System.out.println("AniService AniWeekRanking 에러");
            return null;
        }
    }
}
