package com.example.boot.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AniReviewDTO {
    private String member_mid;
    private Long Ani_id;
    private Double rating;
    private String reviewText;

    public AniReviewDTO(String member_mid, Long Ani_id, Double rating , String reviewText){
        this.member_mid = member_mid;
        this.Ani_id = Ani_id;
        this.rating = rating;
        this.reviewText = reviewText;

    }
}
