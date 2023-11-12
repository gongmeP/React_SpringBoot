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

    private String amid;
    private String amass;
    private String amname;
    private String amemail;
    private String amdepartment;
    private String amrank;
    private String amdelete = "N";


    private LocalDateTime amtime = LocalDateTime.now();
}
