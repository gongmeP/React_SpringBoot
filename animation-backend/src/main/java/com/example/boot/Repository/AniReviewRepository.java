package com.example.boot.Repository;

import com.example.boot.Entity.AniReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AniReviewRepository extends JpaRepository<AniReview,Long> {
}
