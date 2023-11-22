package com.example.boot.Service;

import com.example.boot.Dto.MemberDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.Member;

import java.util.List;

public interface MemberService {



    Member saveMember(Member member);

    List<Member> getMemberData(String loginId);

    List<Member> getAllMemberData();

    Member update(Long id,Member member);

    String delete(Long id);

    boolean idcheck(String mid);

    Member login(Member member);

    MemberDTO memberListpage(int page, int pageSize, Member member);

    MemberDTO MemberlistIdSearch(int page, int pageSize, String mid);

    MemberDTO MemberlistNameSearch(int page, int pageSize, String mid);

    String iddeleteY(Long id);

    String selectiddeleteY(List<Long> SelectMemberArray);

    String PasswordCheck(Member member);

    String PasswordChange(Member member);
    String MemberUpdate(Member member);


}
