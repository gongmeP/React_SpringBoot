package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Favorite;
import com.example.boot.Entity.Member;
import com.example.boot.Entity.ViewList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ViewListRepository extends JpaRepository<ViewList,Long> {
    Optional<ViewList> findByMemberAndAnimation(Member member, Animation animation);
}
