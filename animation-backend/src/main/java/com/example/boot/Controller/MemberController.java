package com.example.boot.Controller;

import com.example.boot.Entity.Member;
import com.example.boot.Service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@SessionAttributes
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

        boolean isMid = memberService.idcheck(mid);

        String message;
        if (isMid) {
            message = "이미 사용중인 아이디 입니다.";
        } else {
            message = "아이디를 사용할 수 있습니다.";
        }

        return ResponseEntity.ok(message);
    }

    @PostMapping("/Member/login")
    @CrossOrigin
    public ResponseEntity<?> login(@RequestBody Member member, HttpSession session) {
        Member loginResult = memberService.login(member);

        System.out.println(member.toString());

        try{

            if (loginResult != null) {
//                session.setAttribute("loginID", loginResult.getMid());
//                session.setAttribute("loginUsername", loginResult.getMname());

                Map<String, String> responseData = new HashMap<>();
                responseData.put("loginID", loginResult.getMid());
                responseData.put("loginUsername", loginResult.getMname());


                return new ResponseEntity<>(responseData, HttpStatus.OK);

            } else {

                Map<String, String> loginNo = new HashMap<>();
                loginNo.put("LoginID","");
                return new ResponseEntity<>(loginNo, HttpStatus.OK);
            }

        }catch (Exception e){
            System.out.println("Member Login 에러");
        }

        return ResponseEntity.ok("로그인실패");
    }


}
