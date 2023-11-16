package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface AnimationRepository extends JpaRepository<Animation,Long> {

    List<Animation> findByDayOfWeekAndUploaded(String dayOfWeek, String uploaded);

    List<Animation> searchByTitleContainingAndAnidelete(String Title , String string);

    List<Animation> findByGenreIn(List<String> genres);

    List<Animation> findByAnidelete(String string);

    @Query("select a from Animation a where a.viewedTime >= :oneDay order by a.viewCount desc")
    List<Animation> findTopViewdConterOneDay(@Param("oneDay")LocalDateTime oneDay, Pageable pageable);

    List<Animation> findTop10ByOrderByViewCountDesc();

}
