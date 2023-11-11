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

        return animationRepository.findAll();

    }

    @Transactional
    @Override
    public Animation Aniupdate(Long id, Animation animation) {
        Animation animationEntityEntity = animationRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
        animationEntityEntity.setTitle(animation.getTitle());

        return animationEntityEntity;
    }


    @Transactional
    @Override
    public String Anidelete(Long id) {
      animationRepository.deleteById(id);
      return "ok";
    }


    @Override
    public List<Animation> SearchByTitle(String Title) {

      return  animationRepository.searchByTitleContaining(Title);

    }


    @Override
    public List<Animation> GenreFilterByTitle(List<String> genre) {


        return  animationRepository.findByGenreIn(genre);
    }
}
