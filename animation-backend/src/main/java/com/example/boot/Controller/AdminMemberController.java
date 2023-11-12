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

}
