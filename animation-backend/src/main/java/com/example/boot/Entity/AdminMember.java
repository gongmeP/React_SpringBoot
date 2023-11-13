package com.example.boot.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AdminMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminid;
    private String adminpass;
    private String adminname;
    private String adminemail;
    private String adminnumber;
    private String admindepartment;
    private String adminrank;
    private String approval;
    private String iddelete;


    private LocalDateTime intime = LocalDateTime.now();
}
