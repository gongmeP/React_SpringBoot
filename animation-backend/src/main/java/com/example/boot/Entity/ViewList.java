package com.example.boot.Entity;

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
@Table(name = "viewlist")
@Builder
public class ViewList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "viewlist_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_mid")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ani_id")
    private Animation animation;

    private LocalDateTime viewtime = LocalDateTime.now();
}
