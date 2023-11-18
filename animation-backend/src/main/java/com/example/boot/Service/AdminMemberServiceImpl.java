package com.example.boot.Service;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Entity.Animation;
import com.example.boot.Repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AdminMemberServiceImpl implements AdminMemberService {

    private final AdminMemberRepository adminMemberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AdminMember saveadmin(AdminMember adminMember) {
        adminMember.setAdminpass(passwordEncoder.encode(adminMember.getAdminpass()));
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
            if(passwordEncoder.matches(adminMember.getAdminpass(),adminMemberEntity.getAdminpass())){

                return adminMemberEntity;

            }else {
                return null;
            }

        }else{
            return null;
        }

    }

}
