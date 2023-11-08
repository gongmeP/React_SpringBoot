package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AnimationRepository;
import com.sun.org.apache.bcel.internal.generic.ACONST_NULL;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    @Transactional
    @Override
    public  Animation saveAni(Animation animation , MultipartFile AniImgFile) {

        try{
            String AniImgPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\file\\AniImgFile";
            UUID uuid = UUID.randomUUID();

            String AniImgName = uuid + "_" + AniImgFile.getOriginalFilename();

            java.io.File saveFile = new File(AniImgPath,AniImgName);

            AniImgFile.transferTo(saveFile);


        }catch (Exception e){

            System.out.println(e);
            System.out.println("Service Ani Save 오류");

        }

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


}
