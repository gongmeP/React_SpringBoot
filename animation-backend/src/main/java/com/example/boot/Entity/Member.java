package com.example.boot.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mid;
    private String mpass;
    private String mname;
    private String memail;
    private String mnumber;
    private String maddress;
    private String mdelete = "n";

    private LocalDateTime logintime = LocalDateTime.now();
    private LocalDateTime mtime = LocalDateTime.now();
}
