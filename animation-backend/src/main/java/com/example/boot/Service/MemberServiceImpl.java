package com.example.boot.Service;


import com.example.boot.Dto.MemberDTO;
import com.example.boot.Entity.Member;
import com.example.boot.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Override
    public boolean idcheck(String mid) {

        Optional<Member> exmid = MemberRepository.findByMid(mid);

        return exmid.isPresent();
    }

    @Override
    public Member login(Member member) {

        Optional<Member> byloginid = MemberRepository.findByMid(member.getMid());

        if(byloginid.isPresent()){
            Member memberEntity = byloginid.get();
            if(memberEntity.getMpass().equals(member.getMpass())){

            return memberEntity;

            }else {
                return null;
            }

        }else{
            return null;
        }

    }

    @Override
    public MemberDTO memberListpage(int page,int pageSize, Member member) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id").descending());

        long totalMembers = MemberRepository.count();
        Page<Member> memberlist = MemberRepository.findByMdelete("n",pageable);

        return new MemberDTO(memberlist,totalMembers);
    }

    @Override
    public MemberDTO MemberlistIdSearch(int page, int pageSize, String mid) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id").descending());

        long countByMdeleteAndMidLike = MemberRepository.countByMdeleteAndMidLike("n", "%"+mid+"%");
        Page<Member> memberlist = MemberRepository.findByMdeleteAndMidLike("n",pageable, "%"+mid+"%");


        return new MemberDTO(memberlist,countByMdeleteAndMidLike);
    }
}
