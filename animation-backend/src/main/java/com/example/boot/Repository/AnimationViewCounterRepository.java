package com.example.boot.Repository;

import com.example.boot.Entity.AnimationViewCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnimationViewCounterRepository extends JpaRepository<AnimationViewCount,Long> {
    AnimationViewCount findByAnimationIdAndDate(Long animationId, LocalDateTime date);

    List<AnimationViewCount> findByAnimationId(Long animationId);

    List<AnimationViewCount> findByOrderByViewCountDesc();

    List<AnimationViewCount> findTop10ByDateOrderByViewCountDesc(LocalDateTime date);

    List<AnimationViewCount> findByDateBetweenOrderByViewCountDesc(LocalDateTime Week, LocalDateTime today);
}
