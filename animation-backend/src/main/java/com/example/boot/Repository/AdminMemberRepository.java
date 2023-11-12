package com.example.boot.Repository;

import com.example.boot.Entity.AdminMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMemberRepository extends JpaRepository<AdminMember,Long> {
}
