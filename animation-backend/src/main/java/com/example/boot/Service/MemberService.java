package com.example.boot.Service;

import com.example.boot.Entity.Book;
import com.example.boot.Entity.Member;
import com.example.boot.mappers.MemberMapper;

import java.util.List;

public interface MemberService {



    Member saveMember(Member member);

    Member getMemberId(Long id);

    List<Member> getAllMemberData();

    Member update(Long id,Member member);

    String delete(Long id);

    boolean idcheck(String mid);

    Member login(Member member);
}
