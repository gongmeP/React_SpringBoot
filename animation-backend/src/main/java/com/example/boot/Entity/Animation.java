package com.example.boot.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Animation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;
    private String content;
    private String photo;
    private String genre;
    private String dayOfWeek;
    private double averageRating;
    private String uploaded;
    private int viewCount;
    private String viewed;
    private LocalDateTime viewedTime;
    private String favorite;
    private LocalDateTime Date = LocalDateTime.now();


}
