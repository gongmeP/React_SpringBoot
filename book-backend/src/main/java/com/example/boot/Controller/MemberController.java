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

    @PostMapping("/Member/idcheck")
    @CrossOrigin
    public ResponseEntity<String> idcheck(@RequestBody String mid) {
        System.out.println(mid);
        boolean isMid = memberService.idcheck(mid);

        System.out.println(isMid);

        String message;
        if (isMid) {
            message = "이미 사용중인 아이디 입니다.";
        } else {
            message = "아이디를 사용할 수 있습니다.";
        }

        return ResponseEntity.ok(message);
    }

}
