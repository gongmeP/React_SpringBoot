package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface AnimationRepository extends JpaRepository<Animation,Long> {

    List<Animation> findByDayOfWeekAndUploadedAndAnidelete(String dayOfWeek, String uploaded,String n);

    List<Animation> searchByTitleContainingAndAnideleteOrderByIdDesc(String Title , String string);
    List<Animation>  searchByTitleContainingAndAnideleteAndUploadedOrderByIdDesc(String Title , String string,String y);

    List<Animation> findByGenreIn(List<String> genres);

    List<Animation> findByGenreInAndUploaded(List<String> genres,String y);

    List<Animation> findByAnideleteAndUploadedOrderByIdDesc(String n,String y,Pageable pageable);

    List<Animation> findByAnideleteAndUploadedOrderByViewCountDesc(String n,String y,Pageable pageable);


    List<Animation> findByAnideleteOrderByIdDesc(String n,Pageable pageable);
    List<Animation> findByAnideleteOrderByViewCountDesc(String n, Pageable pageable);

}
