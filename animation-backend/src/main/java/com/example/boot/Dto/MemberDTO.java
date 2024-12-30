package com.example.boot.Dto;

import com.example.boot.Entity.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class MemberDTO {
    private Page<Member> member;
    private  long totalPage;

    public MemberDTO(Page<Member> member, long totalPage){
        this.member = member;
        this.totalPage = totalPage;
    }
}
