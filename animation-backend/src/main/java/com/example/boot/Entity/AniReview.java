package com.example.boot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="ani_review")
@Builder
public class AniReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "review_id")
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "animation_id", referencedColumnName = "id")
    @JsonIgnore
    private Animation animation;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    @JsonIgnore
    private Member member;

    private String memberMid;
    private String animationTitle;
    private String reviewText;
    private Double rating;
    private Long likes;
    private String reviewDelete = "n";
    private LocalDateTime reviewDate = LocalDateTime.now();
}
