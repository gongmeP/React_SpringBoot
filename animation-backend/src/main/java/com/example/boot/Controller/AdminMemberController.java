package com.example.boot.Controller;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Entity.Member;
import com.example.boot.Service.AdminMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @PostMapping("/addAdmin")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody AdminMember adminMember){



        return new ResponseEntity<>(adminMemberService.saveadmin(adminMember), HttpStatus.CREATED);
    }



    @PostMapping("/Admin/idcheck")
    @CrossOrigin
    public ResponseEntity<String> idcheck(@RequestBody String adminid) {


        boolean isMid = adminMemberService.idcheck(adminid);

        String message;
        if (isMid) {
            message = "이미 사용중인 아이디 입니다.";
        } else {
            message = "아이디를 사용할 수 있습니다.";
        }

        return ResponseEntity.ok(message);
    }


    @PostMapping("/Admin/login")
    @CrossOrigin
    public ResponseEntity<?> login(@RequestBody AdminMember adminMember, HttpSession session) {
        try{
            AdminMember loginResult = adminMemberService.login(adminMember);
            if (loginResult != null) {

                Map<String, String> responseData = new HashMap<>();
                responseData.put("loginID", loginResult.getAdminid());
                responseData.put("loginUsername", loginResult.getAdminname());
                responseData.put("AdminApproval", loginResult.getApproval());

                return new ResponseEntity<>(responseData, HttpStatus.OK);

            } else {

                Map<String, String> loginNo = new HashMap<>();
                loginNo.put("LoginID","");
                return new ResponseEntity<>(loginNo, HttpStatus.OK);
            }

        }catch (Exception e){
            System.out.println("AdminMember Login 에러");
        }

        return ResponseEntity.ok("로그인실패");
    }



}
