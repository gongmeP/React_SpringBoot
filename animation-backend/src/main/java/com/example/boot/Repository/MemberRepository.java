package com.example.boot.Repository;


import com.example.boot.Entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByMid(String mid);

    Page<Member> findByMdelete(String mdelete, Pageable pageable);

    long count();



}
