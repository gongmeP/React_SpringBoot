package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AnimationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


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
            animationRepository.save(animation);
            return "ViewCount 업데이트 성공";
        }catch (Exception e){
            return "ViewCounterupdate 에러";
        }
    }
}
