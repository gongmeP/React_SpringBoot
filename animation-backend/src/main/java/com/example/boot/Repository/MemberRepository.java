package com.example.boot.Repository;


import com.example.boot.Entity.Favorite;
import com.example.boot.Entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByMid(String mid);

    Optional<Member> findByMidAndMdelete(String mid, String string);

    Page<Member> findByMdelete(String mdelete, Pageable pageable);

    Page<Member> findByMdeleteAndMidLike(String mdelete, Pageable pageable,String mid);

    Page<Member> findByMdeleteAndMnameLike(String mdelete, Pageable pageable,String mname);

    long countByMdelete(String mdelete);

    long countByMdeleteAndMidLike(String mdelete, String mid);
    long countByMdeleteAndMnameLike(String mdelete, String name);




}
