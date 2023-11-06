package com.example.boot.mappers;


import com.example.boot.Entity.FreeBoard;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FreeBoardMapper {
    List<FreeBoard> getAllFreeBoards();

    List<FreeBoard> getFreeBoardPages(int pageSize, int offset);

    int getFreeBoardTotalPages();

    List<FreeBoard> SaveFreeBoards(FreeBoard freeBoard);

    List<FreeBoard> getIdByFreeBoards(Long fbNum);

    Long FBReadCountUp(Long fnNum);

}
