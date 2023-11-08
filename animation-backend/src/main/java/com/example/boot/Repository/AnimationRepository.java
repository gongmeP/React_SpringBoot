package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AnimationRepository extends JpaRepository<Animation,Long> {

    List<Animation> findByDayOfWeekAndUploaded(String dayOfWeek, String uploaded);


}
