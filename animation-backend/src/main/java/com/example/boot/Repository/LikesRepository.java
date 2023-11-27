package com.example.boot.Repository;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes,Long> {

    Likes findByAniReviewAndMemberMid(AniReview aniReview, String memberid);

    List<Likes> findByMemberMid(String memberid);
}
