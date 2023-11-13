package com.example.boot.Controller;

import com.example.boot.Entity.AdminMember;
import com.example.boot.Service.AdminMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
