package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AnimationService {

    Animation saveAni(Animation animation);

    Animation getAniById(Long id);

    Page<Animation> getAllAniData(Pageable pageable);

    Animation Aniupdate(Long id, Animation animation);

    String Anidelete(Long id);

}
