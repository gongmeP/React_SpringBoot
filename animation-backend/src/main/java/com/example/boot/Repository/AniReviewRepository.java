package com.example.boot.Repository;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AniReviewRepository extends JpaRepository<AniReview,Long> {

    AniReview findByMemberAndAnimation(Member member, Animation animation);
    List<AniReview> findByAnimationAndReviewDelete(Animation animation, String n);
    Long countByMemberMid(String mid);
    Long countByMemberMidAndReviewTextIsNotNull(String mid);

    Long countByAnimationTitle(String animation);
}
