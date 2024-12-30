package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;
import com.example.boot.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    //즐찾 여부 확인
    Optional<Favorite> findByMemberAndAnimation(Member member, Animation animation);

    List<Favorite> findByMemberId (Long useridINgetID);

}
