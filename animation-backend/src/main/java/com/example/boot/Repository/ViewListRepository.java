package com.example.boot.Repository;

import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Member;
import com.example.boot.Entity.ViewList;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface ViewListRepository extends JpaRepository<ViewList,Long> {
    Optional<ViewList> findByMemberAndAnimation(Member member, Animation animation);

    List<ViewList> findByMemberId (Long useridINgetID, Pageable pageable);
}
