package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AnimationService {

    Animation saveAni(Animation animation, MultipartFile File);

    Animation getAniById(Long id);

    Page<Animation> getAllAniData(Pageable pageable);

    List<Animation> getAllAniDataALL();

    Animation Aniupdate(Long id, Animation animation);

    String Anidelete(Long id);

}
