package com.example.boot.Service;

import com.example.boot.Dto.FreeBoardDTO;
import com.example.boot.Entity.FreeBoard;

import java.util.List;

public interface FreeBoardService {

    List<FreeBoard> getAllFreeBoards();

    List<FreeBoard> getFreeBoardPages(int pageSize, int offset);

    int getFreeBoardTotalPages();

    List<FreeBoard> SaveFreeBoards(FreeBoard freeBoard);


    List<FreeBoard>  getIdByFreeBoards(Long fnNum);

    Long  FBReadCountUp(Long fnNum);

    List<FreeBoard> UpdatefreeBoardSave(FreeBoard freeBoard);

    Long  DeletefreeBoardSave(Long fnNum);

    FreeBoardDTO BoardSearch (String fbtitle, int pageSize, int offset);

    String selectiddeleteY(List<Long> SelectBoardArray);

}
