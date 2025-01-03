package com.example.boot.Service;


import com.example.boot.Dto.MemberDTO;
import com.example.boot.Entity.Member;
import com.example.boot.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository MemberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Member saveMember(Member member) {
        try {

            member.setMpass(passwordEncoder.encode(member.getMpass()));
            return  MemberRepository.save(member);
        }catch (Exception e){

            return  null;
        }
    }


    @Override
    public List<Member> getMemberData(String loginId) {

        try{
           List<Member> getMember = MemberRepository.findAllByMid(loginId);
          
            return getMember;
        }catch (Exception e){

            System.out.println("MemberService getMemberData 에러");
            return null;
        }

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

        Optional<Member> byloginid = MemberRepository.findByMidAndMdelete(member.getMid(),"n");

        if(byloginid.isPresent()){
            Member memberEntity = byloginid.get();
         
            //현재 입렫된 비밀번호 와 맴버리스트에 담긴 비밀번호와 matches 를 확인함
            //matches 입력된 비번화 저장된 비번의 해시값을 비교 일치여부 확인
            if(passwordEncoder.matches(member.getMpass(),memberEntity.getMpass())){
                memberEntity.setLogintime(LocalDateTime.now());
                MemberRepository.save(memberEntity);

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
        long totalMembers = MemberRepository.countByMdelete("n");
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

    @Override
    public MemberDTO MemberlistNameSearch(int page, int pageSize, String mname) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id").descending());

        long countByMdeleteAndMidLike = MemberRepository.countByMdeleteAndMnameLike("n", "%"+mname+"%");
        Page<Member> memberlist = MemberRepository.findByMdeleteAndMnameLike("n",pageable, "%"+mname+"%");


        return new MemberDTO(memberlist,countByMdeleteAndMidLike);
    }

    @Override
    public String iddeleteY(Long id) {
        try{

                Member member = MemberRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("회원 정보없음"));

            member.setMdelete("y");
            MemberRepository.save(member);
            return "삭제완료";
        }catch (Exception e){
            System.out.println(e);
            System.out.println("MemberService iddeleteY 에러");
            return "삭제실패";
        }

    }

    @Override
    public String selectiddeleteY(List<Long> SelectMemberArray) {
        try{
            //SelectMemberArray 값을 하나씩 꺼내서 id 한개씩 넣어주면서 반복
            for(Long id : SelectMemberArray){
                Member member = MemberRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("회원 정보없음"));
                member.setMdelete("y");
                MemberRepository.save(member);

            }

            return "삭제완료";
        }catch (Exception e){
            System.out.println(e);
            System.out.println("MemberService selectiddeleteY 에러");
            return "삭제실패";
        }
    }

    @Override
    public String PasswordCheck(Member member) {
        try {
            Member Remember = MemberRepository.findByMid(member.getMid())
                    .orElseThrow(() -> new RuntimeException("회원 정보없음"));

            if(passwordEncoder.matches(member.getMpass(),Remember.getMpass())){
                return "현재 비번 일치";
            }else{
                return "현재 비번 불일치";
            }
        }catch (Exception e){
            return "MemberService PasswordCheck 에러";
        }

    }

    @Override
    public String PasswordChange(Member member) {
        try{
            Member Remember = MemberRepository.findByMid(member.getMid())
                    .orElseThrow(() -> new RuntimeException("회원 정보없음"));
            Remember.setMpass(passwordEncoder.encode(member.getMpass()));
            MemberRepository.save(Remember);
            return "비밀번호 변경 성공";
        }catch (Exception e){
            return "MemberService PasswordChange 에러";
        }
    }

    @Override
    public String MemberUpdate(Member member) {
        try{
            Member Remember = MemberRepository.findByMid(member.getMid())
                    .orElseThrow(() -> new RuntimeException("회원 정보없음"));
            Remember.setMaddress(member.getMaddress());
            Remember.setMname(member.getMname());
            Remember.setMnumber(member.getMnumber());
            Remember.setMemail(member.getMemail());
            MemberRepository.save(Remember);
            return "회원수정 완료";
        }catch (Exception e){
            return "MemberService MemberUpdate 에러";
        }
    }
}
