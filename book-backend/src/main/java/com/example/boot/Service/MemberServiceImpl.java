package com.example.boot.Service;

import com.example.boot.Entity.Member;
import com.example.boot.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MemberRepository;

    @Override
    @Transactional
    public Member saveMember(Member member) {
        return  MemberRepository.save(member);
    }

    @Override
    public Member getMemberId(Long id) {
        return MemberRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
    }

    @Override
    public List<Member> getAllMemberData() {
        return MemberRepository.findAll();
    }

    @Override
    public Member update(Long id, Member member) {
        Member memberEntity = MemberRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID 를 확인해주세요"));
        memberEntity.setMid(member.getMid());
        memberEntity.setMid(member.getMaddress());
        memberEntity.setMid(member.getMpass());
        memberEntity.setMid(member.getMemail());
        memberEntity.setMid(member.getMnumber());
        memberEntity.setMid(member.getMaddress());
        return memberEntity;
    }

    @Override
    public String delete(Long id) {
        MemberRepository.deleteById(id);
        return "Member삭제완료";
    }

}
