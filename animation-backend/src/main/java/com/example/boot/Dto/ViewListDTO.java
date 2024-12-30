package com.example.boot.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewListDTO {

    private String member_mid;
    private Long Ani_id;

    public ViewListDTO(String member_mid, Long Ani_id){
        this.member_mid = member_mid;
        this.Ani_id = Ani_id;
    }
}
