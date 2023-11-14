package com.example.boot.Controller;

import com.example.boot.Dto.MemberDTO;
import com.example.boot.Entity.Member;
import com.example.boot.Service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
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

        System.out.println(mid);
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


    @GetMapping("/Memberlist/Page")
    @CrossOrigin
    public MemberDTO memberList(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pagesize", defaultValue = "1") int pageSize,
            Member member){
        
        try{

            MemberDTO MemberlistTototalEA = memberService.memberListpage(page,pageSize,member);


            return MemberlistTototalEA;
        }catch (Exception e){
            System.out.println(e);
            System.out.println("/MemberList/Page 에러");
        }

        return null;

    }

    @GetMapping("/Memberlist/IdSearch")
    @CrossOrigin
    public MemberDTO memberList(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pagesize", defaultValue = "1") int pageSize,
            String mid , String mname){

        try{
            MemberDTO memberlistSearch = null;

            if(mid != null){
                memberlistSearch = memberService.MemberlistIdSearch(page,pageSize,mid);
            }else if(mname!=null) {

                memberlistSearch = memberService.MemberlistNameSearch(page,pageSize,mname);
            }
            else{
                System.out.println("/Memberlist/IdSearch RequestParam 에러");
            }

            return memberlistSearch;
        }catch (Exception e){
            System.out.println(e);
            System.out.println("/MemberList/Search 에러");
        }

        return null;

    }



    @PutMapping("/Memberlist/DeleteUpdate/{id}")
    @CrossOrigin
    public ResponseEntity<?> iddeleteY(@PathVariable Long id){
        String messge;
        try {
            messge = memberService.iddeleteY(id);
            return ResponseEntity.ok(messge);
        }catch (Exception e){
            
            return ResponseEntity.ok("/Memberlist/DeleteUpdate 오류");
        }


    }



}
