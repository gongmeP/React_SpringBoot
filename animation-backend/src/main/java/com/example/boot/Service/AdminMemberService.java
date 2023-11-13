package com.example.boot.Service;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Entity.Member;


public interface AdminMemberService {
    AdminMember saveadmin(AdminMember adminMember);

    boolean idcheck(String adminid);

    AdminMember login(AdminMember adminMember);
}
