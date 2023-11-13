package com.example.boot.Repository;

import com.example.boot.Entity.AdminMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminMemberRepository extends JpaRepository<AdminMember,Long> {
    Optional<AdminMember> findByAdminid(String adminid);
}
