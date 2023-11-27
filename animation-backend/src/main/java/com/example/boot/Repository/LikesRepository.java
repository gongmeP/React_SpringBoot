package com.example.boot.Repository;

import com.example.boot.Entity.AniReview;
import com.example.boot.Entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes,Long> {

    Likes findByAniReview(AniReview aniReview);
}
