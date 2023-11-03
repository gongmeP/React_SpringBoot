package com.example.boot.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class FreeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fbNum;
    private String fbTitle;
    private String fbContent;
    private  String userid;
    private String photo;
    private String fbDel;
    private Long fbReadCount;
    private Long replyCount;
    private LocalDateTime fbDate = LocalDateTime.now();

}
