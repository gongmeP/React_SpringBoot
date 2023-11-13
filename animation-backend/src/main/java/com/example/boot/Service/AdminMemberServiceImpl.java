package com.example.boot.Service;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AdminMemberServiceImpl implements AdminMemberService {

    private final AdminMemberRepository adminMemberRepository;

    @Override
    public AdminMember saveadmin(AdminMember adminMember) {

        return adminMemberRepository.save(adminMember);
    }

    @Override
    public boolean idcheck(String adminid) {

        Optional<AdminMember> exmid = adminMemberRepository.findByAdminid(adminid);

        return exmid.isPresent();
    }


    @Override
    public AdminMember login(AdminMember adminMember) {

        Optional<AdminMember> byloginid = adminMemberRepository.findByAdminid(adminMember.getAdminid());

        if(byloginid.isPresent()){
            AdminMember adminMemberEntity = byloginid.get();
            if(adminMemberEntity.getAdminpass().equals(adminMember.getAdminpass())){

                return adminMemberEntity;

            }else {
                return null;
            }

        }else{
            return null;
        }

    }
}
