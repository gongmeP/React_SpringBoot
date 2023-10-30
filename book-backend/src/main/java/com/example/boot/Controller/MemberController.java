package com.example.boot.Controller;

import com.example.boot.Entity.Member;
import com.example.boot.Service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private  final MemberService memberService;

    @PostMapping("/addMember")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody Member member){

        System.out.println(member.toString());

        return new ResponseEntity<>(memberService.saveMember(member), HttpStatus.CREATED);
    }


}
