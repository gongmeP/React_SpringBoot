package com.example.boot.Service;

import com.example.boot.Entity.Animation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AnimationService {

    Animation saveAni(Animation animation);

    Animation getAniById(Long id);

    Page<Animation> getAllAniData(Pageable pageable);

    List<Animation> getAllAniDataALL(Pageable pageable,String admin);

    Animation Aniupdate(Long id, Animation animation);

    String DeleteY(Long id);

    List<Animation> getDayOfWeek(String day_of_week);

    List<Animation> SearchByTitle(String title,String admin);

    List<Animation> GenreFilterByTitle(List<String> genre,String admin);

    String ViewCounterupdate(Long id);

    List<Animation> AllViewRanking();

    List<Animation> AniOneDayRanking();

    List<Animation> AniWeekRanking();

    List<Animation> ALLOderByConter(Pageable pageable,String admin);


}
