package com.example.boot.mappers;


import com.example.boot.Entity.FreeBoard;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FreeBoardMapper {
    List<FreeBoard> getAllFreeBoards();

}
