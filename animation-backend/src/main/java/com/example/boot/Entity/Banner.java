package com.example.boot.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "banner_id")
    private Long bannerId;

    private String title;
    private String mainimgBanner;
    private String textimgBanner;
    private String linkUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdTime = LocalDateTime.now();
}
