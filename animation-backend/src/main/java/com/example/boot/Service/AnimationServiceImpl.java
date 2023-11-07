package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AnimationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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

    @Transactional
    @Override
    public Page<Animation> getAllAniData(Pageable pageable) {
        return animationRepository.findAll(pageable);
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


}
