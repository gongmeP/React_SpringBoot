package com.example.boot.Service;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AdminMemberServiceImpl implements AdminMemberService {

    private final AdminMemberRepository adminMemberRepository;

    @Override
    public AdminMember saveadmin(AdminMember adminMember) {

        return adminMemberRepository.save(adminMember);
    }
}
