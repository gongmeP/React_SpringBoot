package com.example.boot.Dto;

import com.example.boot.Entity.FreeBoard;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FreeBoardDTO {
    private List<FreeBoard> freeBoard;
    private int totalPage;

    public FreeBoardDTO(List<FreeBoard> freeBoard,int totalPage){
        this.freeBoard = freeBoard;
        this.totalPage = totalPage;
    }
}
